# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shadows is a modern CSS box-shadow generator built with Nuxt 4, Vue 3, and shadcn-vue components. It allows users to create multi-layered CSS box shadows with a visual interface and includes presets for Material Design and TailwindCSS shadows.

## Development Commands

```bash
# Install dependencies
npm install

# Serve with hot reload at localhost:3000
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static project
npm run generate

# Lint code
npm run lint

# Format code with Prettier
npm run format

# Lint and fix issues
npm run lint:fix
```

## Architecture

### State Management (Pinia)

- **stores/shadow.ts**: Core shadow management state using Pinia
  - Manages shadow objects with properties: id, visible, angle, distance, x, y, blur, spread, color, opacity
  - Generates CSS output via `cssShadow` getter that converts shadow objects to CSS box-shadow strings
  - Provides `cssWithVendorPrefixes` getter for compatibility
  - Handles multi-layer shadows with visibility toggles
  - Actions for add/duplicate/delete shadows and field updates
  - Automatically updates x,y coordinates when angle or distance changes

### Key Components

- **ShadowBuilder.vue**: Main interface with controls for all shadow layers
- **ShadowInputRow.vue**: Individual shadow layer controls with sliders and increment/decrement buttons
- **ShadowPreview.vue**: Real-time visual preview of shadows with customizable background and card settings
- **BuilderCard.vue**: Container for the shadow builder interface
- **PresetCard.vue**: Interface for loading Material Design and TailwindCSS presets
- **PreviewSettings.vue**: Controls for customizing preview appearance

### UI Components (shadcn-vue)

- Uses shadcn-vue components with Tailwind CSS for modern, accessible UI
- Key UI components: Button, Card, Input, Label, Slider, Switch, Tabs, Tooltip
- Components located in `components/ui/` with proper TypeScript definitions

### Utilities

- **utils/index.ts**: Consolidated utility functions
  - `hexToRgba()`: Color conversion from hex to rgba with opacity
  - `xAndYFromAngleDistance()`: Trigonometry for angle/distance to x/y coordinate conversion
  - `copyToClipboard()`: Async clipboard functionality
  - `cn()`: Tailwind class name merging utility

- **utils/presets.ts**: Comprehensive shadow presets
  - Material Design elevation levels (1-24) with accurate shadow combinations
  - TailwindCSS shadow presets (Small, Default, Medium, Large, Extra Large, 2XL)
  - Each preset includes multiple shadow layers for realistic depth

### Composables

- **composables/usePreviewDefaults.ts**: Preview configuration management
  - Defines default settings for preview cards and page background
  - Handles responsive sizing with configurable units (px, rem, vh, vw)
  - Supports both grid and varied view modes
  - Provides helper functions for formatting style values

- **composables/useEventTracking.ts**: Google Analytics tracking for user interactions

### Configuration

- **Nuxt 4** with Vue 3 composition API
- **Pinia** for state management
- **shadcn-vue** + **Tailwind CSS** for UI components and styling
- **Google Analytics** via @nuxtjs/google-gtag for user behavior tracking
- **ESLint** and **Prettier** for code quality
- TypeScript support throughout
- Auto-imports disabled for explicit imports

### Shadow Object Structure

```typescript
interface Shadow {
  id: number
  visible: boolean
  angle: number        // degrees (0-360)
  distance: number     // pixels
  x: number           // calculated from angle/distance
  y: number           // calculated from angle/distance  
  blur: number        // pixels
  spread: number      // pixels (-50 to 50)
  color: string       // hex color
  opacity: number     // percentage (0-100)
}
```

### Data Flow

1. **Shadow Creation**: Default shadows created in Pinia store
2. **User Input**: Sliders and controls in ShadowInputRow update store via actions
3. **Coordinate Calculation**: Store automatically converts angle/distance to x/y coordinates
4. **CSS Generation**: Store getters convert shadow objects to CSS strings
5. **Preview Rendering**: ShadowPreview applies computed CSS to preview elements
6. **Export**: Users can copy CSS with vendor prefixes for compatibility

The app emphasizes real-time preview with customizable viewing options, making it easier to visualize shadows in different contexts.
