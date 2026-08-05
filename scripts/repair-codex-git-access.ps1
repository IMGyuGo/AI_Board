$ErrorActionPreference = "Stop"

Set-Location "D:\jungleCamp\Projects\AI"

function Invoke-NativeCommand {
    param(
        [Parameter(Mandatory = $true)]
        [string] $FilePath,

        [Parameter(Mandatory = $true)]
        [string[]] $Arguments
    )

    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$FilePath $($Arguments -join ' ') failed with exit code $LASTEXITCODE"
    }
}

Write-Host "Repairing Codex git access for sandbox account..." -ForegroundColor Cyan

$rawGitDir = (git rev-parse --absolute-git-dir).Trim()
$gitDir = [System.IO.Path]::GetFullPath($rawGitDir)
if (-not $gitDir -or -not (Test-Path -LiteralPath $gitDir)) {
    throw "Could not locate the repository git directory. git rev-parse returned: '$rawGitDir', normalized to: '$gitDir'"
}

Write-Host "Git directory: $gitDir" -ForegroundColor Cyan

$denySidValues = @(
    "S-1-5-21-83245495-2502045386-1884400621-2720638773",
    "S-1-5-21-2112888869-295251865-1389550078-1198182604"
)

function Remove-DenySidAcesFromSddl {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Path,

        [Parameter(Mandatory = $true)]
        [string[]] $SidValues
    )

    $acl = Get-Acl -LiteralPath $Path
    $sddl = $acl.GetSecurityDescriptorSddlForm([System.Security.AccessControl.AccessControlSections]::All)
    $updatedSddl = $sddl

    foreach ($sid in $SidValues) {
        $escapedSid = [regex]::Escape($sid)
        $updatedSddl = [regex]::Replace($updatedSddl, "\(D;[^)]*;;;$escapedSid\)", "")
    }

    if ($updatedSddl -ne $sddl) {
        $acl.SetSecurityDescriptorSddlForm($updatedSddl)
        Set-Acl -LiteralPath $Path -AclObject $acl
        return 1
    }

    return 0
}

Write-Host "Taking ownership of the git directory so ACL repair can update inherited entries..."
Invoke-NativeCommand "takeown" @("/F", $gitDir, "/R", "/D", "Y")

Write-Host "Disabling inheritance under the git directory so inherited deny entries become removable..."
Invoke-NativeCommand "icacls" @($gitDir, "/inheritance:d", "/T", "/C")

Write-Host "Removing deny entries that override Codex allow rules..."
$items = @(Get-Item -LiteralPath $gitDir -Force) + @(Get-ChildItem -LiteralPath $gitDir -Force -Recurse)
$removedTotal = 0
foreach ($item in $items) {
    $removedTotal += Remove-DenySidAcesFromSddl -Path $item.FullName -SidValues $denySidValues
}
Write-Host "Updated $removedTotal ACL object(s) with matching deny ACEs."

$targets = @(
    $gitDir,
    (Join-Path $gitDir "FETCH_HEAD"),
    (Join-Path $gitDir "config"),
    (Join-Path $gitDir "index"),
    (Join-Path $gitDir "ORIG_HEAD"),
    (Join-Path $gitDir "packed-refs"),
    (Join-Path $gitDir "refs"),
    (Join-Path $gitDir "logs"),
    (Join-Path $gitDir "objects")
)

foreach ($target in $targets) {
    if (Test-Path -LiteralPath $target) {
        Write-Host "Granting CodexSandboxUsers modify on $target"
        Invoke-NativeCommand "icacls" @($target, "/grant", "dev\CodexSandboxUsers:(OI)(CI)M", "/T", "/C")
        Invoke-NativeCommand "icacls" @($target, "/grant", "dev\codexsandboxoffline:(OI)(CI)M", "/T", "/C")
    }
}

Write-Host ""
Write-Host "Result checks:" -ForegroundColor Green
icacls (Join-Path $gitDir "FETCH_HEAD")
git remote -v
