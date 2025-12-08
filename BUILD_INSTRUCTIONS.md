# Building Desktop Applications for Cocoa Rave

## Prerequisites

- Node.js 20+
- npm or yarn
- For Windows builds: Windows 10/11
- For macOS builds: macOS with Xcode Command Line Tools

## Building

### Build Web App
```bash
npm run build
```

### Build Windows EXE (Portable)
```bash
npm run build:win
```

The Windows executable will be in `release/win-unpacked/Cocoa Rave.exe`

### Build macOS DMG
```bash
npm run build:mac
```

The macOS DMG will be in `release/` directory

### Build All Platforms
```bash
npm run build:all
```

## Creating GitHub Release

### Option 1: Using GitHub Actions (Recommended)

1. Push your code to GitHub
2. Create a tag: `git tag v1.0.0`
3. Push the tag: `git push origin v1.0.0`
4. GitHub Actions will automatically build and create a release

### Option 2: Manual Release

1. Build the applications locally
2. Go to GitHub repository → Releases → Draft a new release
3. Upload the following files:
   - `release/Cocoa-Rave-Windows-x64.zip` (or `release/*.exe`)
   - `release/*.dmg` (for macOS)
4. Add release notes and publish

## Windows EXE Location

The Windows executable is located at:
- **Portable**: `release/win-unpacked/Cocoa Rave.exe`
- **Installer**: `release/*.exe` (if NSIS build succeeds)

## macOS DMG Location

The macOS DMG is located at:
- `release/*.dmg`

## Troubleshooting

### Code Signing Errors
If you encounter code signing errors, set:
```bash
# Windows PowerShell
$env:CSC_IDENTITY_AUTO_DISCOVERY='false'

# macOS/Linux
export CSC_IDENTITY_AUTO_DISCOVERY=false
```

### Permission Errors
On Windows, you may need to run PowerShell as Administrator for some operations.

