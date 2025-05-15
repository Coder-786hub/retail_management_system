/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Geist Sans', 'Satoshi', 'Inter', 'ui-sans-serif', 'system-ui'],
        'heading': ['Space Grotesk', 'Geist Sans', 'Satoshi', 'ui-sans-serif', 'system-ui'],
        'mono': ['Geist Mono', 'JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
        'terminal': ['JetBrains Mono', 'IBM Plex Mono', 'Geist Mono', 'ui-monospace', 'monospace'],
        'accent': ['Space Grotesk', 'Satoshi', 'ui-sans-serif', 'system-ui'],
        'premium': ['Neue Haas Grotesk', 'Geist Sans', 'ui-sans-serif', 'system-ui'],
        'code': ['Berkeley Mono', 'Geist Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Base backgrounds
        'obsidian': '#0C0C0D',  
        'gunmetal': '#111214',  
        'eclipse': '#16181C',   
        
        // Glow Accents
        'cyber-teal': '#00FFC2',
        'raspberry': '#FF5C8A',
        'cool-indigo': '#95A3FF', 
        'toxic-green': '#A6FF00',
        'laser-purple': '#B39DFF',
        
        // Neutrals / Text
        'ghost-white': '#F6F9FC',
        'soft-gray': '#8A8F98',
        'slate-blue': '#3B3F47',
        
        // Panel colors
        'panel-darker': 'rgba(17, 18, 20, 0.7)',
        'panel-dark': 'rgba(22, 24, 28, 0.7)',
        
        // Text colors
        'text-primary': '#F6F9FC',
        'text-secondary': '#8A8F98',
        'text-muted': '#3B3F47',
      },
      backgroundImage: {
        'panel-gradient': 'linear-gradient(145deg, #0C0C0D, #16181C)',
      },
      backgroundColor: {
        'panel': 'rgba(22, 24, 28, 0.7)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(12px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.typing-cursor': {
          display: 'inline-block',
          width: '2px',
          height: '1.2em',
          backgroundColor: '#8A8F98',
          marginLeft: '2px',
          verticalAlign: 'middle',
        },
        '.terminal-system': {
          color: '#8A8F98',
        },
        '.terminal-ai': {
          color: '#8A8F98',
        },
        '.terminal-trend': {
          color: '#8A8F98',
        },
        '.terminal-insight': {
          color: '#8A8F98',
        },
        '.card-chart': {
          backgroundColor: 'rgba(22, 24, 28, 0.4)',
          borderRadius: '0.5rem',
          padding: '0.75rem',
          border: 'none',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
        },
        '.card-insight': {
          backgroundColor: 'rgba(22, 24, 28, 0.4)',
          borderRadius: '0.5rem',
          padding: '0.75rem',
          border: 'none',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
        },
        '.card-risk': {
          backgroundColor: 'rgba(22, 24, 28, 0.4)',
          borderRadius: '0.5rem',
          padding: '0.75rem',
          border: 'none',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
        },
        '.panel-header': {
          borderBottom: '1px solid rgba(59, 63, 71, 0.3)',
        },
        '.ai-active': {
          borderLeft: '2px solid #3B3F47',
        },
        '.glass': {
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(17, 18, 20, 0.7)',
          border: 'none',
        },
        '.glass-panel': {
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(22, 24, 28, 0.5)',
          border: 'none',
        },
        '.glass-panel-elevated': {
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(22, 24, 28, 0.7)',
          border: 'none',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
        '.page-fixed': {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        },
        '.bg-panel': {
          background: 'linear-gradient(145deg, #0C0C0D, #16181C)',
        },
        '.shadow-apple-hover': {
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.18), 0 15px 25px rgba(0, 0, 0, 0.1), 0 0 1px rgba(255, 255, 255, 0.2)',
        },
        // New utilities
        '.glow-text': {
          textShadow: '0 0 4px rgba(0, 255, 194, 0.6)',
        },
        '.hover-glow:hover': {
          boxShadow: '0 0 8px #00FFC2',
          transition: '0.2s ease',
        },
        '.terminal-teal': {
          color: '#00FFC2',
        },
        '.terminal-raspberry': {
          color: '#FF5C8A',
        },
        '.terminal-indigo': {
          color: '#95A3FF',
        },
        '.terminal-green': {
          color: '#A6FF00',
        },
        '.terminal-purple': {
          color: '#B39DFF',
        },
      };
      addUtilities(newUtilities);
    },
    // Ensure filters plugin is included for backdrop-filter
    require('tailwindcss/plugin')(({ addUtilities }) => {
      addUtilities({
        '.backdrop-blur-none': { 'backdrop-filter': 'none', '-webkit-backdrop-filter': 'none' },
        '.backdrop-blur-sm': { 'backdrop-filter': 'blur(4px)', '-webkit-backdrop-filter': 'blur(4px)' },
        '.backdrop-blur-md': { 'backdrop-filter': 'blur(8px)', '-webkit-backdrop-filter': 'blur(8px)' },
        '.backdrop-blur-lg': { 'backdrop-filter': 'blur(12px)', '-webkit-backdrop-filter': 'blur(12px)' },
        '.backdrop-blur-xl': { 'backdrop-filter': 'blur(16px)', '-webkit-backdrop-filter': 'blur(16px)' },
        '.backdrop-blur-2xl': { 'backdrop-filter': 'blur(24px)', '-webkit-backdrop-filter': 'blur(24px)' },
        '.backdrop-blur-3xl': { 'backdrop-filter': 'blur(32px)', '-webkit-backdrop-filter': 'blur(32px)' },
      });
    }),
  ],
}; 