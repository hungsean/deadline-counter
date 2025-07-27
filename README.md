# 漂浮小方塊插件 (Floating Box Chrome Extension)

A simple Chrome extension that adds a draggable floating box widget to any webpage.

## Features
- 📦 Draggable floating box that appears on all web pages
- 🎨 Click to change colors randomly
- 🖱️ Smooth drag and drop functionality
- 🔒 Minimal permissions (activeTab only)

## Installation
1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the project folder
5. The extension should now be active on all web pages

## Development

### Project Structure
```
deadline-counter/
├── manifest.json      # Extension manifest
├── content.js         # Main functionality
├── content.css        # Styling
├── popup.html         # Extension popup
├── CLAUDE.md          # Claude Code collaboration docs
└── README.md          # This file
```

### Working with Claude Code
This project is set up for collaboration with Claude Code. See `CLAUDE.md` for detailed project context, coding conventions, and development guidelines.

### Key Files
- **manifest.json**: Chrome Extension Manifest V3 configuration
- **content.js**: Contains the floating box creation and drag functionality
- **content.css**: Styles for the floating box widget
- **popup.html**: Extension popup interface

## Technical Details
- **Manifest Version**: 3
- **Permissions**: `activeTab` (minimal permissions approach)
- **Injection**: Content script runs on all URLs
- **Browser Support**: Chrome/Chromium browsers

## Usage
Once installed, the extension automatically adds a small draggable box to every webpage you visit. You can:
- Drag the box around the page
- Click it to change its background color
- The box will persist as you navigate within the same tab

## Contributing
When working on this project:
1. Follow the coding conventions outlined in `CLAUDE.md`
2. Test changes across multiple websites
3. Maintain Chinese comments for consistency
4. Use minimal permissions approach for security