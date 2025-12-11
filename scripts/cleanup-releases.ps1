# Script to delete old Electron releases and create new Tauri release
# Usage: .\scripts\cleanup-releases.ps1

$repo = "mmeyer1s/TestingWithVite2"
$oldReleases = @("v1.0.0", "v1.0.1", "v1.0.2", "v1.0.3")

Write-Host ""
Write-Host "Deleting old Electron releases..." -ForegroundColor Yellow
Write-Host ""

foreach ($tag in $oldReleases) {
    Write-Host "Deleting release and tag: $tag" -ForegroundColor Cyan
    
    # Delete the local tag
    git tag -d $tag 2>$null | Out-Null
    
    # Delete the remote tag
    git push origin --delete $tag 2>$null | Out-Null
    
    Write-Host "  Tag deleted" -ForegroundColor Green
}

Write-Host ""
Write-Host "Manual cleanup required:" -ForegroundColor Yellow
Write-Host "Visit https://github.com/$repo/releases and delete each old release manually" -ForegroundColor White
Write-Host ""

Write-Host "Creating new Tauri release tag..." -ForegroundColor Yellow
Write-Host ""

$newTag = "v2.0.0"

Write-Host "Creating tag: $newTag" -ForegroundColor Cyan
git tag -a $newTag -m "Tauri version with Firestore leaderboard"
git push origin $newTag

Write-Host ""
Write-Host "New tag created and pushed!" -ForegroundColor Green
Write-Host "GitHub Actions will now build and publish the Tauri apps" -ForegroundColor White
Write-Host "Monitor progress at: https://github.com/$repo/actions" -ForegroundColor Cyan
Write-Host ""
