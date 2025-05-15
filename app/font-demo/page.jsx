'use client';

import React from 'react';
import Link from 'next/link';

export default function FontDemo() {
  const systemFonts = [
    { name: 'Geist Sans', className: '', style: { fontFamily: 'Geist Sans' }, source: 'Vercel' },
    { name: 'Satoshi', className: '', style: { fontFamily: 'Satoshi' }, source: 'Fontshare' },
    { name: 'Inter', className: '', style: { fontFamily: 'Inter' }, source: 'Google Fonts' },
    { name: 'Space Grotesk', className: '', style: { fontFamily: 'Space Grotesk' }, source: 'Google Fonts' },
    { name: 'Neue Haas Grotesk', className: 'premium-ui', style: {}, source: 'Commercial' }
  ];

  const monoFonts = [
    { name: 'Geist Mono', className: '', style: { fontFamily: 'Geist Mono' }, source: 'Vercel' },
    { name: 'JetBrains Mono', className: '', style: { fontFamily: 'JetBrains Mono' }, source: 'JetBrains' },
    { name: 'IBM Plex Mono', className: '', style: { fontFamily: 'IBM Plex Mono' }, source: 'Google Fonts' },
    { name: 'Berkeley Mono', className: 'berkeley-code', style: {}, source: 'Commercial' }
  ];

  return (
    <div className="min-h-screen bg-obsidian p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-heading text-ghost-white">Font Demo</h1>
          <Link href="/" className="btn btn-accent">Back to Home</Link>
        </div>

        <div className="glass-panel-elevated mb-8">
          <h2 className="text-2xl font-heading text-ghost-white mb-4">System / UI Fonts</h2>
          <div className="space-y-8">
            {systemFonts.map((font, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center text-soft-gray mb-2">
                  <span className="text-sm font-mono">{font.name}</span>
                  <span className="text-xs bg-panel-dark px-2 py-1 rounded-full">{font.source}</span>
                </div>
                <div 
                  className={`${font.className} text-3xl text-ghost-white`}
                  style={font.style}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
                <div 
                  className={`${font.className} text-lg text-soft-gray mt-2`}
                  style={font.style}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 !@#$%^&*()
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel-elevated">
          <h2 className="text-2xl font-heading text-ghost-white mb-4">Mono / Terminal Fonts</h2>
          <div className="space-y-8">
            {monoFonts.map((font, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center text-soft-gray mb-2">
                  <span className="text-sm font-mono">{font.name}</span>
                  <span className="text-xs bg-panel-dark px-2 py-1 rounded-full">{font.source}</span>
                </div>
                <div 
                  className={`${font.className} text-2xl text-ghost-white`}
                  style={font.style}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
                <div 
                  className={`${font.className} text-lg text-soft-gray mt-2`}
                  style={font.style}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 !@#$%^&*()
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="terminal p-6">
            <pre className="terminal-system mb-2">$ font-check --system</pre>
            <pre className="terminal-ai">Loading fonts from system...</pre>
            <div className="mt-4 space-y-2">
              {systemFonts.map((font, index) => (
                <div key={index} className="terminal-entry flex justify-between">
                  <span className={index % 2 === 0 ? "text-cyber-teal" : "text-cool-indigo"}>{font.name}</span>
                  <span className="text-soft-gray">STATUS: LOADED</span>
                </div>
              ))}
            </div>
            <pre className="terminal-system mt-4 mb-2">$ font-check --mono</pre>
            <pre className="terminal-ai">Loading mono fonts...</pre>
            <div className="mt-4 space-y-2">
              {monoFonts.map((font, index) => (
                <div key={index} className="terminal-entry flex justify-between">
                  <span className={index % 2 === 0 ? "text-toxic-green" : "text-raspberry"}>{font.name}</span>
                  <span className="text-soft-gray">STATUS: LOADED</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 