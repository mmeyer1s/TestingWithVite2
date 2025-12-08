#!/usr/bin/env node

/**
 * Helper script to prepare files for GitHub release
 */

const fs = require('fs')
const path = require('path')

const releaseDir = path.join(__dirname, '../release')
const outputDir = path.join(__dirname, '../release-artifacts')

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

console.log('📦 Preparing release artifacts...\n')

// Copy Windows EXE
const winExe = path.join(releaseDir, 'win-unpacked', 'Cocoa Rave.exe')
const winZip = path.join(releaseDir, 'Cocoa-Rave-Windows-x64.zip')

if (fs.existsSync(winZip)) {
  fs.copyFileSync(winZip, path.join(outputDir, 'Cocoa-Rave-Windows-x64.zip'))
  console.log('✅ Windows ZIP ready:', 'Cocoa-Rave-Windows-x64.zip')
} else if (fs.existsSync(winExe)) {
  console.log('✅ Windows EXE ready:', 'Cocoa Rave.exe')
  console.log('   Location: release/win-unpacked/Cocoa Rave.exe')
}

// Check for macOS DMG
const macDmg = fs.readdirSync(releaseDir).find(f => f.endsWith('.dmg'))
if (macDmg) {
  fs.copyFileSync(
    path.join(releaseDir, macDmg),
    path.join(outputDir, macDmg)
  )
  console.log('✅ macOS DMG ready:', macDmg)
} else {
  console.log('ℹ️  macOS DMG not found. Build on macOS or use GitHub Actions.')
}

console.log('\n📋 Release Checklist:')
console.log('1. Go to GitHub repository → Releases → Draft a new release')
console.log('2. Create a tag (e.g., v1.0.0)')
console.log('3. Upload files from release/ directory:')
if (fs.existsSync(winZip)) {
  console.log('   - Cocoa-Rave-Windows-x64.zip')
}
if (macDmg) {
  console.log('   -', macDmg)
}
console.log('4. Add release notes')
console.log('5. Publish release\n')

console.log('💡 Tip: Use GitHub Actions for automatic builds on tag push!')
console.log('   See .github/workflows/build-desktop.yml\n')

