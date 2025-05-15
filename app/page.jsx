'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const demos = [
    { path: '/animations', title: 'Animation Examples', description: 'Modern UI animations with glow effects, card animations, and command palette' },
    { path: '/command-test', title: 'Command Palette', description: 'Simple test of the command palette component' },
    { path: '/basic-test', title: 'Basic Animations', description: 'Basic animation test with tabs' },
    { path: '/design-examples', title: 'Design System', description: 'Examples of the design system components and tokens' },
  ];

  return (
    <div className="min-h-screen bg-obsidian p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass-panel-elevated mb-8">
          <h1 className="text-4xl font-heading text-ghost-white mb-4">MORF UI Examples</h1>
          <p className="text-soft-gray mb-2">
            Modern UI design system with next-gen animations and effects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demos.map((demo, index) => (
            <Link href={demo.path} key={index}>
              <div className="glass-panel hover-glow transition-all duration-300 h-full">
                <h2 className="text-xl font-heading text-ghost-white mb-2">{demo.title}</h2>
                <p className="text-soft-gray text-sm">{demo.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 