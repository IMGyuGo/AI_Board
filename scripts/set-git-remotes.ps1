$ErrorActionPreference = "Stop"

Set-Location "D:\jungleCamp\Projects\AI"

Write-Host "Current remotes" -ForegroundColor Cyan
git remote -v

$origin1Exists = git remote 2>$null | Where-Object { $_ -eq "origin1" }
if (-not $origin1Exists) {
    git remote rename origin origin1
} else {
    git remote set-url origin1 git@github.com:IMGyuGo/AI_Board.git
}

$originExists = git remote 2>$null | Where-Object { $_ -eq "origin" }
if ($originExists) {
    git remote set-url origin git@IMGyuGo:IMGyuGo/AI_Board.git
} else {
    git remote add origin git@IMGyuGo:IMGyuGo/AI_Board.git
}

Write-Host ""
Write-Host "Updated remotes" -ForegroundColor Green
git remote -v
