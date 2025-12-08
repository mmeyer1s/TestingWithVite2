# Creating a GitHub Release

## Quick Start

### Option 1: Automatic Build with GitHub Actions (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Snake game and desktop app support"
   git push origin main
   ```

2. **Create and push a tag**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **GitHub Actions will automatically:**
   - Build Windows EXE on Windows runner
   - Build macOS DMG on macOS runner
   - Create a GitHub release with both files

### Option 2: Manual Release

#### Step 1: Build Locally

**Windows EXE:**
```bash
npm run build:win
```

**macOS DMG (requires macOS):**
```bash
npm run build:mac
```

#### Step 2: Create GitHub Release

1. Go to your GitHub repository
2. Click **Releases** → **Draft a new release**
3. **Tag version**: `v1.0.0` (create new tag)
4. **Release title**: `Cocoa Rave v1.0.0 - Desktop App Release`
5. **Description**:
   ```markdown
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
   ```

6. **Attach files**:
   - Drag and drop `release/Cocoa-Rave-Windows-x64.zip`
   - Drag and drop `release/*.dmg` (if built on macOS)

7. Click **Publish release**

## File Locations

After building, find your files here:

- **Windows EXE**: `release/win-unpacked/Cocoa Rave.exe`
- **Windows ZIP**: `release/Cocoa-Rave-Windows-x64.zip`
- **macOS DMG**: `release/Cocoa Rave-1.0.0.dmg` (or similar)

## Building for macOS on Windows

Since you're on Windows, you have two options:

1. **Use GitHub Actions** (easiest) - Push a tag and let CI build it
2. **Build on macOS** - Use a Mac or macOS VM to run `npm run build:mac`

## Troubleshooting

### Code Signing Errors
If you see code signing errors, the build will still create the executable, but it won't be signed. This is fine for personal use.

### Missing DMG
If you don't have a DMG file, you can:
- Use GitHub Actions to build it automatically
- Build on a Mac: `npm run build:mac`
- Skip macOS for now and only release Windows version

### Large File Sizes
The Electron apps are large (~140MB) because they include Chromium. This is normal.

## Next Steps

After creating the release:
1. Share the release URL with users
2. Users can download and run the desktop app
3. Update your website to link to the GitHub release

