// Preload script for Electron
// This runs in a context that has access to both DOM and Node.js APIs
// but is isolated from the main process

window.electronAPI = {
  platform: process.platform,
  versions: process.versions
}

