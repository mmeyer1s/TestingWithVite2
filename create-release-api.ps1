# Create GitHub Release via API
# Usage: .\create-release-api.ps1 -Token YOUR_GITHUB_TOKEN

param(
    [Parameter(Mandatory=$true)]
    [string]$Token,
    [string]$Tag = "v1.0.0",
    [string]$Repo = "mmeyer1s/TestingWithVite2"
)

$releaseNotes = Get-Content "RELEASE_NOTES.md" -Raw

$releaseData = @{
    tag_name = $Tag
    name = "Cocoa Rave $Tag - Desktop App Release"
    body = $releaseNotes
    draft = $false
    prerelease = $false
} | ConvertTo-Json -Depth 10

$headers = @{
    "Authorization" = "token $Token"
    "Accept" = "application/vnd.github.v3+json"
}

$releaseUrl = "https://api.github.com/repos/$Repo/releases"

Write-Host "Creating release for tag: $Tag" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri $releaseUrl -Method Post -Headers $headers -Body $releaseData -ContentType "application/json"
    
    Write-Host "`n✅ Release created successfully!" -ForegroundColor Green
    Write-Host "Release URL: $($response.html_url)" -ForegroundColor Cyan
    
    # Upload Windows zip
    $zipPath = "release/Cocoa-Rave-Windows-x64.zip"
    if (Test-Path $zipPath) {
        Write-Host "`nUploading Windows ZIP..." -ForegroundColor Yellow
        
        $uploadUrl = $response.upload_url -replace '\{.*\}', "?name=Cocoa-Rave-Windows-x64.zip"
        
        $fileBytes = [System.IO.File]::ReadAllBytes($zipPath)
        $boundary = [System.Guid]::NewGuid().ToString()
        
        $bodyLines = @(
            "--$boundary",
            "Content-Disposition: form-data; name=`"file`"; filename=`"Cocoa-Rave-Windows-x64.zip`"",
            "Content-Type: application/zip",
            "",
            [System.Text.Encoding]::GetEncoding('iso-8859-1').GetString($fileBytes),
            "--$boundary--"
        ) -join "`r`n"
        
        $uploadHeaders = @{
            "Authorization" = "token $Token"
            "Accept" = "application/vnd.github.v3+json"
            "Content-Type" = "multipart/form-data; boundary=$boundary"
        }
        
        try {
            Invoke-RestMethod -Uri $uploadUrl -Method Post -Headers $uploadHeaders -Body ([System.Text.Encoding]::GetEncoding('iso-8859-1').GetBytes($bodyLines))
            Write-Host "✅ Windows ZIP uploaded successfully!" -ForegroundColor Green
        } catch {
            Write-Host "⚠️  Could not upload ZIP automatically: $($_.Exception.Message)" -ForegroundColor Yellow
            Write-Host "You can upload it manually at: $($response.html_url)" -ForegroundColor Cyan
        }
    }
    
    Write-Host "`n🎉 Release complete! View at: $($response.html_url)" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ Error creating release: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Yellow
    }
    Write-Host "`nYou can create it manually at:" -ForegroundColor Cyan
    Write-Host "https://github.com/$Repo/releases/new?tag=$Tag" -ForegroundColor Cyan
}

