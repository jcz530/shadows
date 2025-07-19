# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shadows is a CSS box-shadow generator built with Nuxt.js 2 and Vuetify. It allows users to create multi-layered CSS box shadows with a visual interface and includes presets for Material Design and TailwindCSS shadows.

## Development Commands

```bash
# Install dependencies
npm install

# Serve with hot reload at localhost:3000
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Generate static project
npm run generate

# Lint JavaScript and Vue files
npm run lint
npm run lint:js
```

## Architecture

### State Management (Vuex)
- **store/builder.js**: Core shadow management state
  - Manages shadow objects with properties: id, visible, angle, distance, x, y, blur, spread, color, opacity
  - Generates CSS output via `cssShadow` getter that converts shadow objects to CSS box-shadow strings
  - Handles multi-layer shadows with visibility toggles
  - Mutations for add/duplicate/delete shadows and field updates

### Key Components
- **ShadowBuilder.vue**: Main interface with controls for all shadow layers
- **ShadowBuilderInputRow.vue**: Individual shadow layer controls
- **ShadowPreview.vue**: Real-time visual preview of shadows
- **BuilderCard.vue**: Container for the shadow builder interface

### Utilities
- **utils/colors.js**: Color conversion functions (hex to rgba, rgba to hex)
- **utils/trig.js**: Angle/distance to x/y coordinate conversion
- **utils/presets.js**: Material Design and TailwindCSS shadow presets
- **utils/css.js**: CSS parsing utilities
- **utils/clipboard.js**: Copy to clipboard functionality

### Configuration
- Uses Nuxt.js 2 with Vuetify for UI components
- PWA enabled with manifest configuration
- Google Analytics integration via @nuxtjs/google-gtag
- Static site generation target
- SVG support via @nuxtjs/svg

### Shadow Object Structure
```javascript
{
  id: number,
  visible: boolean,
  angle: number (degrees),
  distance: number (pixels),
  x: number (calculated from angle/distance),
  y: number (calculated from angle/distance),
  blur: number (pixels),
  spread: number (pixels),
  color: string (hex),
  opacity: number (0-100)
}
```

The app converts angle/distance inputs to x/y coordinates and generates vendor-prefixed CSS output for maximum compatibility.