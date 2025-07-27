# Chrome Extension Project - Floating Box Widget

## Project Overview

This is a Chrome extension called "漂浮小方塊插件" (Floating Box Plugin) that creates a draggable floating widget on web pages. The extension displays a small draggable box with emoji that users can move around and interact with.

## Project Structure

- `manifest.json` - Chrome extension manifest (v3)
- `content.js` - Main content script with floating box logic
- `content.css` - Styles for the floating box
- `popup.html` - Extension popup interface

## Development Guidelines

### Code Style & Conventions

- Use Chinese comments for consistency with existing codebase
- Use camelCase for JavaScript variables and functions
- Use kebab-case for CSS classes and IDs
- Indent with 2 spaces
- Use semicolons in JavaScript

### Extension Architecture

- **Manifest Version**: 3 (Chrome Extension Manifest V3)
- **Permissions**: `activeTab` only (minimal permissions)
- **Content Scripts**: Injected on all URLs (`<all_urls>`)
- **Action**: Popup-based interaction

### Key Components

1. **Floating Box Creation** (`createFloatingBox()`)
   - Creates draggable box element
   - Prevents duplicate creation
   - Sets initial position and styling

2. **Drag Functionality** (`makeDraggable()`)
   - Implements mouse-based drag and drop
   - Handles mouse events: mousedown, mousemove, mouseup
   - Updates cursor states during drag

3. **Interactive Features**
   - Click to change background color (random from predefined palette)
   - Visual feedback during drag operations

### File Organization

- Keep all Chinese text/comments for consistency
- CSS classes should use `floating-box` prefix
- JavaScript functions should be descriptive and modular

### Testing & Development

- Test on multiple websites to ensure compatibility
- Verify drag functionality works across different page layouts
- Check that extension doesn't interfere with existing page functionality

### Common Commands

- Load extension: Use Chrome Developer Mode in chrome://extensions/
- Debug: Use Chrome DevTools Console for content script debugging
- Reload: Use extension reload button in Chrome Extensions page

### Browser Compatibility

- **Target**: Chrome/Chromium browsers
- **Manifest**: V3 format required
- **APIs**: Standard DOM APIs and Chrome Extension APIs

## Collaboration Notes

- Extension name and descriptions are in Traditional Chinese
- Core functionality focuses on simple drag-and-drop interaction
- Minimal permissions approach for security
- Uses modern Chrome Extension Manifest V3 standards
