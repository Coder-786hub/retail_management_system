# Cannabis Analytics Dashboard

A modern, interactive dashboard for cannabis retail analytics built with Next.js, Tailwind CSS, and React.

## UI Features

The interface has been designed with a modern, ambient aesthetic inspired by tools like Raycast, ChatGPT Copilot, Cursor, and Linear.

### Design Elements

- **Glassmorphism**: All panels use blurred, semi-transparent containers with subtle borders
- **Hover Elevation**: Panels and cards have hover animations with shadow and neon edge glow
- **Developer Console Aesthetic**: Terminal-like interfaces instead of traditional chat bubbles
- **Ambient UI**: Non-intrusive, subtle animations and transitions

### Component Breakdown

1. **Copilot Panel (Command Input)**
   - Replaced traditional chat with command-driven interface
   - Code-like result cards with rich formatting
   - ⌘+K command palette accessibility
   - Floating command input with glow effects

2. **Interactive Canvas (Visualization)**
   - Modular chart cards with interactive elements
   - Insights panel with auto-generated observations
   - Glassmorphic design with hover elevation
   - Neon color system for data visualization

3. **Terminal Feed (Sales Log)**
   - Real-time terminal-like log feed
   - Color-coded message types (System, AI, Trend, etc.)
   - Animation on new entries
   - Filtering and search capabilities

## Technology Stack

- **Framework**: Next.js with React 18
- **Styling**: Tailwind CSS with custom animations
- **Visualization**: Recharts
- **Command Interface**: cmdk
- **Animations**: Framer Motion
- **Typography**: Inter + JetBrains Mono fonts

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at http://localhost:3009

## Design Principles

1. **Ambient Intelligence**: UI that fades into the background when not needed
2. **Glanceability**: Information should be accessible at a glance
3. **Command-First**: Keyboard-driven interface for power users
4. **Spatial Awareness**: Thoughtful layout that gives context through positioning
5. **Progressive Disclosure**: Information revealed as needed, not all at once

### Glassmorphism Implementation

The UI leverages modern glassmorphism design that mimics the look of frosted glass:

- **Translucent panels** with backdrop blur effects
- **Subtle borders** (1px white with low opacity)
- **Depth through shadows** instead of harsh divider lines
- **Gradient glows** for enhanced visual hierarchy

All components use these glass effects for a consistent, premium aesthetic:

```css
.glass {
  background: rgba(17, 18, 20, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
```

The system includes multiple glass styles:
- Standard glass panels
- Elevated containers 
- Floating columns with 3D transforms
- Frosted gradient backgrounds
- Particle nebula effects

## Features

- 🧱 **3-Column Layout**:
  - Left Column: "Log" - Tracks user actions and system responses
  - Middle Column: "Portal" - Displays visualizations and rich content
  - Right Column: "Chat" - Interactive chat interface

- 💡 **Design**:
  - Dark Mode UI
  - Modern neo-brutalist/Raycast-inspired design
  - TailwindCSS for styling
  - Framer Motion for smooth animations
  - Responsive layout with proper spacing

- 🤖 **OpenAI Integration**:
  - GPT-3.5/GPT-4 chat completions integration 
  - Streaming responses for smooth UX
  - Special #PORTAL: tag to route content to visualization panel
  - Full logging of prompts and responses

## Tech Stack

- Next.js for React framework
- TypeScript for type safety
- TailwindCSS for styling
- Framer Motion for animations
- OpenAI API for AI responses
- Axios for HTTP requests

## Getting Started

```bash
# Install dependencies
npm install

# Create an .env.local file with your OpenAI API key
echo "NEXT_PUBLIC_OPENAI_KEY=your_openai_api_key_here" > .env.local

# Run development server
npm run dev
```

The app will be available at http://localhost:3009

## OpenAI API Setup

1. Get an API key from [OpenAI Platform](https://platform.openai.com/)
2. Create an `.env.local` file at the project root with:
   ```
   NEXT_PUBLIC_OPENAI_KEY=your_openai_api_key_here
   ```
3. Replace `your_openai_api_key_here` with your actual API key
4. Restart your development server

## Project Structure

```
/
├── app/
│   ├── components/
│   │   ├── LogPanel.tsx      # Left column log display
│   │   ├── PortalPanel.tsx   # Middle column visualization
│   │   └── ChatPanel.tsx     # Right column chat interface
│   ├── lib/
│   │   └── openai.ts         # OpenAI API integration 
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # API route for OpenAI chat completions
│   ├── globals.css           # Global styles and Tailwind directives
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Main page with 3-column layout
├── public/                   # Static assets
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## How It Works

1. User sends a message in the Chat panel
2. Message is sent to OpenAI's API via a Next.js API route
3. API returns a streamed response which appears in real-time in the Chat panel
4. If the response contains a `#PORTAL:` tag, that content is extracted and displayed in the Portal panel
5. All interactions are logged in the Log panel

### Portal Content

To trigger a visualization in the Portal panel, your prompt should ask for something that would benefit from a visual display. The AI has been instructed to use the `#PORTAL:` tag for such content.

Example: "Show me data about monthly sales in a table format"

## Phase 1 Notes

This is Phase 1 of the project:
- Static three-column layout with placeholder content
- UI components and styling
- Mock interaction between the panels

Phase 2 will add actual OpenAI API integration.

# MORF UI Component Library

A modern, ambient UI system inspired by Raycast, Cursor, and Windsurf.

## Design Language

### Colors

The UI uses a sophisticated dark color scheme with neon accents:

```css
--bg-main: #0d0d11;
--bg-panel: rgba(20, 20, 30, 0.65);
--glass-border: rgba(255, 255, 255, 0.05);
--glow-primary: #00ffc2;
--glow-accent: #95a3ff;
--glow-warn: #ff5c8a;
--text-primary: #f1f5f9;
--text-muted: #a1a1aa;
```

### Typography

- **Headings**: Space Grotesk - Modern, geometric sans-serif
- **Body Text**: Inter - Clear, versatile sans-serif
- **Monospace/Terminal**: IBM Plex Mono - Technical, precise monospace

### Design Principles

1. **Dimensional Depth** - Layered surfaces with glassmorphism
2. **Tactile Feedback** - Subtle animations on interaction  
3. **Ambient Intelligence** - UI elements subtly pulse/glow to indicate state
4. **Focused Information** - Clean typography with clear hierarchy

## Components

### GlowContainer

The base container with glassmorphism and glow effects.

```jsx
<GlowContainer 
  variant="elevated" 
  glowColor="primary"
  isActive={isProcessing}
  isPulsing={isProcessing}
>
  Content goes here
</GlowContainer>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'floating' | 'frosted-gradient' | 'particle-nebula'
- `glowColor`: 'primary' | 'accent' | 'warn' | 'none'
- `isActive`: boolean - Adds animated gradient border
- `isPulsing`: boolean - Adds pulsing glow effect

### Column

Layout component with header, content and footer sections.

```jsx
<Column 
  title="Terminal" 
  floating={true}
  glowColor="primary"
  backgroundVariant="default"
  footer={<Button>Clear</Button>}
>
  Content goes here
</Column>
```

**Props:**
- `title`: string - Column heading
- `floating`: boolean - Enables 3D hover effect
- `backgroundVariant`: 'default' | 'frosted-gradient' | 'particle-nebula' - Background style variant
- `header`: ReactNode - Custom header element
- `footer`: ReactNode - Footer element
- Plus all GlowContainer props

### Button

Interactive button with glow effects.

```jsx
<Button 
  variant="primary"
  glowColor="accent"
  size="md"
  iconLeft={<IconRefresh />}
>
  Refresh
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `glowColor`: 'primary' | 'accent' | 'warn' | 'none'
- `iconLeft`: ReactNode
- `iconRight`: ReactNode

### Badge

Status indicator with optional pulsing effect.

```jsx
<Badge color="primary" variant="filled" pulsing={true}>
  Active
</Badge>
```

**Props:**
- `variant`: 'default' | 'outline' | 'filled'
- `color`: 'primary' | 'accent' | 'warn' | 'muted'
- `size`: 'sm' | 'md'
- `pulsing`: boolean

### TabGroup

Tab navigation component.

```jsx
<TabGroup
  tabs={[
    { id: 'logs', label: 'Logs', icon: <IconTerminal /> },
    { id: 'database', label: 'Database', icon: <IconDatabase /> },
  ]}
  onChange={handleTabChange}
  variant="pills"
/>
```

**Props:**
- `tabs`: Array of tab objects
- `activeTabId`: string
- `onChange`: (tabId: string) => void
- `variant`: 'pills' | 'underline'
- `size`: 'sm' | 'md' | 'lg'

## CSS Utilities

### Glass Panels

```jsx
<div className="glass-panel">Content</div>
<div className="glass-panel-elevated">Elevated content</div>
<div className="floating-column">3D hover effect</div>
<div className="frosted-gradient-glow">Frosted gradient with subtle glow</div>
<div className="particle-nebula">Twinkling particle grid with dark nebula effect</div>
```

### Glow Effects

```jsx
<div className="glow-primary">Green outline</div>
<div className="glow-accent">Blue outline</div>
<div className="glow-warn">Pink outline</div>
<div className="animate-glow">Pulsing glow</div>
<div className="animate-pulse-glow">Ambient pulse</div>
```

### AI State Indicators

```jsx
<div className="ai-state-idle">Idle</div>
<div className="ai-state-processing">Processing</div>
<div className="ai-state-ready">Ready</div>
<div className="ai-state-attention">Needs attention</div>
<div className="copilot-active">Active copilot state</div>
``` 