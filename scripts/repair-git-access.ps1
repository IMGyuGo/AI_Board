$ErrorActionPreference = "Stop"

$repoRoot = "D:\jungleCamp\Projects\AI"
Set-Location $repoRoot

function Step($message) {
    Write-Host ""
    Write-Host "== $message ==" -ForegroundColor Cyan
}

Step "Repository"
Write-Host "Path: $repoRoot"
Write-Host "User: $env:USERNAME"

Step "Current origin"
$originUrl = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "origin: $originUrl"
} else {
    Write-Host "origin lookup failed"
}

if ($originUrl -eq "git@IMGyuGo:IMGyuGo/AI_Board.git") {
    Step "Fixing malformed origin URL"
    git remote set-url origin git@github.com:IMGyuGo/AI_Board.git
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to update origin URL"
    }
    Write-Host "origin updated to git@github.com:IMGyuGo/AI_Board.git"
}

Step "Testing .git write access"
$probePath = Join-Path $repoRoot ".git\_codex_probe.tmp"
try {
    Set-Content -Path $probePath -Value "ok"
    Remove-Item $probePath -Force
    Write-Host ".git write access: OK"
} catch {
    Write-Host ".git write access failed, attempting ACL repair..." -ForegroundColor Yellow
    takeown /F .git /R /D Y | Out-Null
    icacls .git /grant "$env:USERNAME`:(OI)(CI)F" /T /C | Out-Null
    Set-Content -Path $probePath -Value "ok"
    Remove-Item $probePath -Force
    Write-Host ".git write access repaired"
}

Step "Testing GitHub reachability"
git ls-remote https://github.com/IMGyuGo/AI_Board.git
if ($LASTEXITCODE -ne 0) {
    throw "GitHub HTTPS connectivity failed"
}

Step "Pull"
git pull --ff-only
if ($LASTEXITCODE -ne 0) {
    throw "git pull --ff-only failed"
}

Step "Done"
git status --short
Write-Host ""
Write-Host "Repair completed." -ForegroundColor Green
