$ErrorActionPreference = "Stop"

Set-Location "D:\jungleCamp\Projects\AI"

$branch = git branch --show-current
if (-not $branch) {
    throw "Could not determine current branch."
}

$origin1Url = git remote get-url origin1 2>$null
if ($LASTEXITCODE -ne 0 -or -not $origin1Url) {
    throw "Remote 'origin1' does not exist."
}

Write-Host "Using branch: $branch" -ForegroundColor Cyan
Write-Host "Using remote: origin1 -> $origin1Url" -ForegroundColor Cyan

git fetch origin1 $branch
if ($LASTEXITCODE -ne 0) {
    throw "Failed to fetch origin1/$branch"
}

git branch --set-upstream-to="origin1/$branch" $branch
if ($LASTEXITCODE -ne 0) {
    throw "Failed to set upstream to origin1/$branch"
}

git config remote.pushDefault origin1
if ($LASTEXITCODE -ne 0) {
    throw "Failed to set remote.pushDefault to origin1"
}

git config branch.$branch.pushRemote origin1
if ($LASTEXITCODE -ne 0) {
    throw "Failed to set branch.$branch.pushRemote to origin1"
}

Write-Host ""
Write-Host "Updated branch tracking:" -ForegroundColor Green
git branch -vv

Write-Host ""
Write-Host "Push default:" -ForegroundColor Green
git config --get remote.pushDefault
git config --get branch.$branch.pushRemote
