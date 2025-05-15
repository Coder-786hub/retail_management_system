'use client';

import { useState } from 'react';
import App from '../src/App';

export default function Home() {
  const [showFontDemo, setShowFontDemo] = useState(false);
  
  return (
    <main className="flex min-h-screen max-h-screen flex-col bg-zinc-950 text-text-primary page-fixed">
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setShowFontDemo(!showFontDemo)}
          className="btn btn-primary text-sm"
        >
          {showFontDemo ? 'Show App' : 'Font Demo'}
        </button>
      </div>

      {showFontDemo ? (
        <section className="glass-panel-elevated m-8 max-w-5xl mx-auto w-full">
          <h1 className="text-3xl mb-6 font-heading text-glow-subtle">Next-Gen Developer + Sci-Fi Font Demo</h1>
          
          {/* Primary UI Font Section */}
          <div className="card-insight mb-6">
            <h2 className="text-xl mb-3 font-heading">Primary UI Font</h2>
            <p className="font-sans text-lg mb-2">Satoshi: Clean, tech-brutalist modern</p>
            <p className="font-geist text-lg mb-2">Geist: Clean, tech-brutalist modern</p>
            <p className="font-sans text-lg">Inter: Clean, tech-brutalist modern</p>
          </div>
          
          {/* Terminal Feed Section */}
          <div className="terminal p-4 mb-6">
            <h2 className="text-xl mb-3 font-mono">Terminal Feed</h2>
            <p className="font-terminal text-sm mb-2 text-neon-blue">JetBrains Mono: Precision + dev feel</p>
            <p className="font-mono text-sm mb-2 text-neon-blue">IBM Plex Mono: Precision + dev feel</p>
            <div className="bg-panel-darker p-3 rounded-lg">
              <p className="font-terminal text-sm text-[#C3F3FF]">const name = "Developer";</p>
              <p className="font-terminal text-sm text-[#C3F3FF]">console.log("Hello, " + name + "!");</p>
            </div>
          </div>
          
          {/* Headers Section */}
          <div className="bg-panel-darker p-4 rounded-xl mb-6">
            <h3 className="text-lg mb-3 font-heading">Headers (Copilot)</h3>
            <div className="font-geist-mono uppercase text-[18px] caret-pulse mb-4">
              AI COPILOT <span className="typing-cursor"></span>
            </div>
            <div className="font-accent uppercase text-[20px] bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
              SYSTEM READY
            </div>
          </div>
              
          {/* Text Glow */}
          <div className="glass p-4 rounded-xl">
            <h3 className="text-lg mb-2 font-heading">Text Glow</h3>
            <p className="text-glow-subtle mb-2">Subtle primary glow effect</p>
            <p className="text-glow-accent mb-2">Accent color glow effect</p>
            <p className="text-glow-warn">Warning color glow effect</p>
          </div>
        </section>
      ) : (
        <App />
      )}
    </main>
  );
}
