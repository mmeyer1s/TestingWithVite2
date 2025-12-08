# PowerShell script to create GitHub release
# Requires: GitHub Personal Access Token with repo permissions

param(
    [string]$Tag = "v1.0.0",
    [string]$Token = $env:GITHUB_TOKEN
)

$repoUrl = git remote get-url origin
if ($repoUrl -match 'github\.com[:/](.+?)(?:\.git)?$') {
    $repo = $matches[1]
    Write-Host "Repository: $repo"
    
    $releaseUrl = "https://api.github.com/repos/$repo/releases"
    
    $releaseData = @{
        tag_name = $Tag
        name = "Cocoa Rave $Tag - Desktop App Release"
        body = @"
## 🎉 Cocoa Rave Desktop Application Release

### Features
- 🍫 Chocolate storefront with shopping cart
- 🐍 Snake game with high score tracking  
- 📊 Police reports data visualization
- ✨ Beautiful jelly button animations

### Downloads
- **Windows**: Download `Cocoa-Rave-Windows-x64.zip` and extract. Run `Cocoa Rave.exe`
- **macOS**: Download the `.dmg` file, open it, and drag Cocoa Rave to Applications

### What's Included
- Full web application packaged as desktop app
- Snake game accessible from main menu
- All features from web version
- Offline-capable (after first load)

### Building
See `BUILD_INSTRUCTIONS.md` for details on building from source.
"@
        draft = $false
        prerelease = $false
    } | ConvertTo-Json
    
    if (-not $Token) {
        Write-Host "`n❌ GITHUB_TOKEN environment variable not set"
        Write-Host "`nTo create release manually:"
        Write-Host "1. Go to: https://github.com/$repo/releases/new"
        Write-Host "2. Select tag: $Tag"
        Write-Host "3. Upload: release/Cocoa-Rave-Windows-x64.zip"
        Write-Host "4. Copy the release notes above"
        exit 1
    }
    
    Write-Host "`nCreating release..."
    $headers = @{
        "Authorization" = "token $Token"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    try {
        $response = Invoke-RestMethod -Uri $releaseUrl -Method Post -Headers $headers -Body $releaseData -ContentType "application/json"
        Write-Host "✅ Release created: $($response.html_url)"
        
        # Upload Windows zip if it exists
        $zipPath = "release/Cocoa-Rave-Windows-x64.zip"
        if (Test-Path $zipPath) {
            Write-Host "`nUploading Windows ZIP..."
            $uploadUrl = $response.upload_url -replace '\{.*\}', "?name=Cocoa-Rave-Windows-x64.zip"
            $fileBytes = [System.IO.File]::ReadAllBytes($zipPath)
            $fileEnc = [System.Text.Encoding]::GetEncoding('iso-8859-1').GetString($fileBytes)
            $boundary = [System.Guid]::NewGuid().ToString()
            $bodyLines = (
                "--$boundary",
                "Content-Disposition: form-data; name=`"file`"; filename=`"Cocoa-Rave-Windows-x64.zip`"",
                "Content-Type: application/zip",
                "",
                $fileEnc,
                "--$boundary--"
            ) -join "`r`n"
            
            $uploadHeaders = @{
                "Authorization" = "token $Token"
                "Accept" = "application/vnd.github.v3+json"
                "Content-Type" = "multipart/form-data; boundary=$boundary"
            }
            
            Invoke-RestMethod -Uri $uploadUrl -Method Post -Headers $uploadHeaders -Body $bodyLines
            Write-Host "✅ Windows ZIP uploaded"
        }
        
        Write-Host "`n🎉 Release complete!"
        Write-Host "View at: $($response.html_url)"
    } catch {
        Write-Host "`n❌ Error creating release: $($_.Exception.Message)"
        Write-Host "`nYou can create it manually at:"
        Write-Host "https://github.com/$repo/releases/new"
    }
} else {
    Write-Host "❌ Could not determine GitHub repository"
}

