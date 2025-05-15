/**
 * MORF Design System - Next-Gen UI Design Tokens
 * 
 * A modern, AI-inspired design system with neon accents and dark UI
 * Inspired by tools like Raycast, ChatGPT, Cursor, and Linear
 */

// 🔤 Modern Font System
export const fonts = {
  // System / UI Fonts (Geometric + Minimal)
  system: {
    geistSans: 'Geist Sans', // Main UI, cards, headers (Vercel)
    satoshi: 'Satoshi',      // UI, navigation, buttons (Fontshare)
    inter: 'Inter',          // General body, fallback (Google Fonts)
    spaceGrotesk: 'Space Grotesk', // Hero headers, titles (Google Fonts)
    neueHaas: 'Neue Haas Grotesk', // Premium branding UI (Commercial)
  },
  
  // Mono / Terminal Fonts
  mono: {
    geistMono: 'Geist Mono',      // Terminal / code block (Vercel)
    jetbrainsMono: 'JetBrains Mono', // Terminal / insights (JetBrains)
    ibmPlexMono: 'IBM Plex Mono', // Terminal / audit logs (Google Fonts)
    berkeleyMono: 'Berkeley Mono', // High-end dev styling (Commercial)
  },
  
  // Font stacks
  stacks: {
    primary: 'Geist Sans, Satoshi, Inter, ui-sans-serif, system-ui',
    heading: 'Space Grotesk, Geist Sans, Satoshi, ui-sans-serif, system-ui',
    terminal: 'JetBrains Mono, IBM Plex Mono, Geist Mono, ui-monospace, monospace',
    code: 'Berkeley Mono, Geist Mono, JetBrains Mono, ui-monospace, monospace',
    premium: 'Neue Haas Grotesk, Geist Sans, ui-sans-serif, system-ui',
  }
};

// 🎨 Next-Gen Color System
export const colors = {
  // Base Backgrounds
  backgrounds: {
    obsidian: '#0C0C0D',    // Page background
    gunmetal: '#111214',    // Terminal background
    eclipse: '#16181C',     // Panels / Canvas
  },
  
  // Glow Accents
  accents: {
    cyberTeal: '#00FFC2',   // Insight glow, hover states
    raspberry: '#FF5C8A',   // Risk, warning, delete icons
    coolIndigo: '#95A3FF',  // Trend tags, active UI focus
    toxicGreen: '#A6FF00',  // Terminal indicators, system OK
    laserPurple: '#B39DFF', // AI analysis frames, Copilot UI
  },
  
  // Neutrals / Text
  neutrals: {
    ghostWhite: '#F6F9FC',  // Body text / muted cards
    softGray: '#8A8F98',    // Secondary labels, timestamps
    slateBlue: '#3B3F47',   // Dividers, shadows
  },
  
  // Glass panel backgrounds
  glass: {
    panel: 'rgba(22, 24, 28, 0.7)',
    dark: 'rgba(17, 18, 20, 0.7)',
  }
};

// 💅 Visual Enhancements
export const effects = {
  // Shadows
  shadows: {
    apple: '0 20px 50px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.08), 0 0 1px rgba(255, 255, 255, 0.1)',
    appleHover: '0 25px 60px rgba(0, 0, 0, 0.18), 0 15px 25px rgba(0, 0, 0, 0.1), 0 0 1px rgba(255, 255, 255, 0.2)',
    subtle: '0 4px 12px rgba(0, 0, 0, 0.1)',
    strong: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  
  // Gradients
  gradients: {
    panel: 'linear-gradient(145deg, #0C0C0D, #16181C)',
    card: 'linear-gradient(145deg, rgba(22, 24, 28, 0.4), rgba(17, 18, 20, 0.4))',
    accent: `linear-gradient(135deg, #00FFC2, #95A3FF)`,
    danger: `linear-gradient(135deg, #FF5C8A, #B39DFF)`,
    frostedGlow: 'linear-gradient(145deg, #0C0C0D, #111214)',
    particleNebula: 'radial-gradient(#0C0C0D, #111214)'
  },
  
  // Text effects
  textEffects: {
    glowTeal: 'text-shadow: 0 0 4px rgba(0, 255, 194, 0.6)',
    glowRose: 'text-shadow: 0 0 4px rgba(255, 92, 138, 0.6)',
    glowIndigo: 'text-shadow: 0 0 4px rgba(149, 163, 255, 0.6)',
    glowGreen: 'text-shadow: 0 0 4px rgba(166, 255, 0, 0.6)',
    glowPurple: 'text-shadow: 0 0 4px rgba(179, 157, 255, 0.6)',
  },
  
  // Box glow effects
  boxEffects: {
    glowTeal: 'box-shadow: 0 0 8px #00FFC2; transition: 0.2s ease',
    glowRose: 'box-shadow: 0 0 8px #FF5C8A; transition: 0.2s ease',
    glowIndigo: 'box-shadow: 0 0 8px #95A3FF; transition: 0.2s ease',
    glowGreen: 'box-shadow: 0 0 8px #A6FF00; transition: 0.2s ease',
    glowPurple: 'box-shadow: 0 0 8px #B39DFF; transition: 0.2s ease',
  },
  
  // Glassmorphism styles
  glass: {
    default: {
      background: 'rgba(17, 18, 20, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    elevated: {
      background: 'rgba(17, 18, 20, 0.65)',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      backdropFilter: 'blur(12px)',
    },
    floating: {
      background: 'rgba(17, 18, 20, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(16px)',
    },
    terminal: {
      background: 'rgba(17, 18, 20, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.04)',
      backdropFilter: 'blur(12px)',
    }
  }
};

// 📝 Typography Scale
export const typography = {
  heading1: {
    fontSize: '2.5rem',
    lineHeight: '1.2',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    fontFamily: fonts.stacks.heading,
  },
  heading2: {
    fontSize: '2rem',
    lineHeight: '1.25',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    fontFamily: fonts.stacks.heading,
  },
  heading3: {
    fontSize: '1.5rem',
    lineHeight: '1.3',
    fontWeight: '500',
    letterSpacing: '-0.01em',
    fontFamily: fonts.stacks.heading,
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: '400',
    fontFamily: fonts.stacks.primary,
  },
  mono: {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    fontWeight: '400',
    fontFamily: fonts.stacks.terminal,
  },
  small: {
    fontSize: '0.875rem',
    lineHeight: '1.4',
    fontWeight: '400',
    fontFamily: fonts.stacks.primary,
  },
  tiny: {
    fontSize: '0.75rem',
    lineHeight: '1.4',
    fontWeight: '400',
    fontFamily: fonts.stacks.primary,
  },
};

// 🧰 Component Tokens
export const components = {
  // Button variations
  button: {
    primary: {
      background: colors.glass.dark,
      color: colors.neutrals.ghostWhite,
      border: 'none',
      hover: {
        transform: 'translateY(-1px)',
        boxShadow: effects.shadows.strong,
      }
    },
    accent: {
      background: colors.glass.dark,
      color: colors.accents.cyberTeal,
      border: `1px solid ${colors.accents.cyberTeal}`,
      hover: {
        boxShadow: `0 0 8px ${colors.accents.cyberTeal}`,
      }
    },
    danger: {
      background: colors.glass.dark,
      color: colors.accents.raspberry,
      border: `1px solid ${colors.accents.raspberry}`,
      hover: {
        boxShadow: `0 0 8px ${colors.accents.raspberry}`,
      }
    },
  },
  
  // Card variations
  card: {
    insight: {
      background: effects.gradients.card,
      borderLeft: `2px solid ${colors.accents.coolIndigo}`,
      padding: '1rem',
      borderRadius: '0.75rem',
    },
    chart: {
      background: effects.gradients.card,
      borderLeft: `2px solid ${colors.accents.cyberTeal}`,
      padding: '1rem',
      borderRadius: '0.75rem',
    },
    risk: {
      background: effects.gradients.card,
      borderLeft: `2px solid ${colors.accents.raspberry}`,
      padding: '1rem',
      borderRadius: '0.75rem',
    },
  },
  
  // Terminal elements
  terminal: {
    background: colors.backgrounds.gunmetal,
    system: { color: colors.neutrals.softGray },
    ai: { color: colors.accents.cyberTeal },
    trend: { color: colors.accents.coolIndigo },
    insight: { color: colors.accents.toxicGreen },
    warning: { color: colors.accents.raspberry },
  },
};

export default {
  fonts,
  colors,
  effects,
  typography,
  components,
}; 