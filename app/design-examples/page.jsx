'use client';

import React from 'react';
import designTokens from '../design-tokens';

export default function DesignExamples() {
  const { colors, fonts, effects } = designTokens;
  
  return (
    <div className="min-h-screen bg-obsidian p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading text-ghost-white mb-8">MORF Design System</h1>
        
        {/* Color System Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading text-ghost-white mb-4">🎨 Color System</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-2">Base Backgrounds</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(colors.backgrounds).map(([name, color]) => (
                <div key={name} className="rounded-lg overflow-hidden">
                  <div className="h-24" style={{ backgroundColor: color }}></div>
                  <div className="bg-panel p-3 text-ghost-white">
                    <div className="font-mono text-sm mb-1">{name}</div>
                    <div className="font-mono text-xs text-soft-gray">{color}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-2">Glow Accents</h3>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(colors.accents).map(([name, color]) => (
                <div key={name} className="rounded-lg overflow-hidden">
                  <div className="h-24" style={{ backgroundColor: color }}></div>
                  <div className="bg-panel p-3 text-ghost-white">
                    <div className="font-mono text-sm mb-1">{name}</div>
                    <div className="font-mono text-xs text-soft-gray">{color}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-2">Neutrals / Text</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(colors.neutrals).map(([name, color]) => (
                <div key={name} className="rounded-lg overflow-hidden">
                  <div className="h-24" style={{ backgroundColor: color }}></div>
                  <div className="bg-panel p-3 text-ghost-white">
                    <div className="font-mono text-sm mb-1">{name}</div>
                    <div className="font-mono text-xs text-soft-gray">{color}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading text-ghost-white mb-4">🔤 Typography</h2>
          
          <div className="glass-panel mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-4">System / UI Fonts</h3>
            <div className="space-y-6">
              <div>
                <div className="text-sm font-mono text-soft-gray mb-1">Geist Sans (Vercel)</div>
                <div className="text-2xl" style={{fontFamily: fonts.system.geistSans}}>
                  Main UI, cards, headers
                </div>
              </div>
              
              <div>
                <div className="text-sm font-mono text-soft-gray mb-1">Satoshi (Fontshare)</div>
                <div className="text-2xl" style={{fontFamily: fonts.system.satoshi}}>
                  UI, navigation, buttons
                </div>
              </div>
              
              <div>
                <div className="text-sm font-mono text-soft-gray mb-1">Inter (Google Fonts)</div>
                <div className="text-2xl" style={{fontFamily: fonts.system.inter}}>
                  General body, fallback
                </div>
              </div>
              
              <div>
                <div className="text-sm font-mono text-soft-gray mb-1">Space Grotesk (Google Fonts)</div>
                <div className="text-2xl" style={{fontFamily: fonts.system.spaceGrotesk}}>
                  Hero headers, titles
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-4">Mono / Terminal Fonts</h3>
            <div className="space-y-6">
              <div>
                <div className="text-sm font-mono text-soft-gray mb-1">Geist Mono (Vercel)</div>
                <div className="text-xl" style={{fontFamily: fonts.mono.geistMono}}>
                  Terminal / code block
                </div>
              </div>
              
              <div>
                <div className="text-sm font-mono text-soft-gray mb-1">JetBrains Mono (JetBrains)</div>
                <div className="text-xl" style={{fontFamily: fonts.mono.jetbrainsMono}}>
                  Terminal / insights
                </div>
              </div>
              
              <div>
                <div className="text-sm font-mono text-soft-gray mb-1">IBM Plex Mono (Google Fonts)</div>
                <div className="text-xl" style={{fontFamily: fonts.mono.ibmPlexMono}}>
                  Terminal / audit logs
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* UI Components Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading text-ghost-white mb-4">🧰 UI Components</h2>
          
          <div className="glass-panel mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">Primary Button</button>
              <button className="btn btn-accent">Accent Button</button>
              <button className="btn btn-danger">Danger Button</button>
            </div>
          </div>
          
          <div className="glass-panel mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-4">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card-chart">
                <div className="font-heading text-lg mb-2">Chart Card</div>
                <div className="text-soft-gray">Visualize trends and metrics</div>
              </div>
              
              <div className="card-insight">
                <div className="font-heading text-lg mb-2">Insight Card</div>
                <div className="text-soft-gray">Discover key patterns and trends</div>
              </div>
              
              <div className="card-risk">
                <div className="font-heading text-lg mb-2">Risk Card</div>
                <div className="text-soft-gray">Identify important warnings</div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-4">Terminal</h3>
            <div className="terminal p-4">
              <div className="terminal-system">$ system command initiated</div>
              <div className="terminal-ai">AI: Processing request...</div>
              <div className="terminal-trend">TREND: Positive growth detected</div>
              <div className="terminal-insight">INSIGHT: New pattern identified</div>
              <div className="terminal-warning">WARNING: Unknown variable detected</div>
            </div>
          </div>
        </section>
        
        {/* Visual Effects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading text-ghost-white mb-4">💅 Visual Effects</h2>
          
          <div className="glass-panel mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-4">Text Glow</h3>
            <div className="space-y-4">
              <div className="glow-teal text-xl">Cyber Teal Glow</div>
              <div className="glow-rose text-xl">Raspberry Rose Glow</div>
              <div className="glow-indigo text-xl">Cool Indigo Glow</div>
              <div className="glow-green text-xl">Toxic Green Glow</div>
              <div className="glow-purple text-xl">Laser Purple Glow</div>
            </div>
          </div>
          
          <div className="glass-panel mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-4">Hover Effects</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="hover-glow bg-panel-dark rounded-lg p-4 text-center">
                Teal Hover
              </div>
              <div className="hover-glow-rose bg-panel-dark rounded-lg p-4 text-center">
                Rose Hover
              </div>
              <div className="hover-glow-indigo bg-panel-dark rounded-lg p-4 text-center">
                Indigo Hover
              </div>
              <div className="hover-glow-green bg-panel-dark rounded-lg p-4 text-center">
                Green Hover
              </div>
              <div className="hover-glow-purple bg-panel-dark rounded-lg p-4 text-center">
                Purple Hover
              </div>
            </div>
          </div>
          
          <div className="glass-panel mb-8">
            <h3 className="text-xl font-heading text-ghost-white mb-4">Glassmorphism</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-lg">
                <div className="font-heading text-lg mb-2">Glass Panel</div>
                <div className="text-soft-gray">Basic frosted glass effect</div>
              </div>
              
              <div className="glass-panel-elevated">
                <div className="font-heading text-lg mb-2">Elevated Panel</div>
                <div className="text-soft-gray">Enhanced glass with shadow</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 