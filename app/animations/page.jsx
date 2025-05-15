'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simplified components
const PulseGlowElement = ({ children, color = 'teal', className = '' }) => {
  const colorClass = color === 'rose' ? 'pulse-glow-rose' :
                    color === 'indigo' ? 'pulse-glow-indigo' :
                    color === 'green' ? 'pulse-glow-green' :
                    color === 'purple' ? 'pulse-glow-purple' :
                    'pulse-glow';
  
  return (
    <div className={`${colorClass} ${className}`}>
      {children}
    </div>
  );
};

// Tab content wrapper with transitions
const TabContent = ({ children, isActive }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Command palette component
const CommandPalette = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="command-palette w-full max-w-2xl p-4 bg-gunmetal rounded-xl"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function AnimationsPage() {
  const [activeTab, setActiveTab] = useState('ambient');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  
  const tabs = [
    { id: 'ambient', label: 'Ambient' },
    { id: 'cards', label: 'Cards' },
    { id: 'hover', label: 'Hover' },
    { id: 'command', label: 'Command' }
  ];
  
  return (
    <div className="min-h-screen bg-obsidian p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading text-ghost-white mb-2">Animation Effects</h1>
        <p className="text-soft-gray mb-8">Modern UI animations inspired by Raycast, ChatGPT, and Cursor</p>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-panel-dark text-cyber-teal border border-cyber-teal/30 pulse-glow' 
                  : 'bg-panel-darker text-soft-gray hover:text-ghost-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* 1. Ambient Glow Effects */}
        <TabContent isActive={activeTab === 'ambient'}>
          <section className="mb-12">
            <h2 className="text-2xl font-heading text-ghost-white mb-4">Ambient Glow Effects</h2>
            <p className="text-soft-gray mb-6">Matrix-inspired elements that pulse or glow as if being processed by an AI brain.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <PulseGlowElement color="teal" className="rounded-lg bg-panel-dark p-4">
                <h3 className="text-cyber-teal mb-2">Cyber Teal Pulse</h3>
                <p className="text-soft-gray text-sm">Standard teal pulsing glow effect</p>
              </PulseGlowElement>
              
              <PulseGlowElement color="rose" className="rounded-lg bg-panel-dark p-4">
                <h3 className="text-raspberry mb-2">Raspberry Rose Pulse</h3>
                <p className="text-soft-gray text-sm">Warning/error state pulsing glow</p>
              </PulseGlowElement>
              
              <PulseGlowElement color="indigo" className="rounded-lg bg-panel-dark p-4">
                <h3 className="text-cool-indigo mb-2">Cool Indigo Pulse</h3>
                <p className="text-soft-gray text-sm">Info/trend state pulsing glow</p>
              </PulseGlowElement>
            </div>
          </section>
        </TabContent>
        
        {/* 2. Card Load Animations */}
        <TabContent isActive={activeTab === 'cards'}>
          <section className="mb-12">
            <h2 className="text-2xl font-heading text-ghost-white mb-4">Card Load Animations</h2>
            <p className="text-soft-gray mb-6">MacOS-like fluidity with subtle fade & scale with spring easing.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="rounded-lg bg-panel-dark p-4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-ghost-white mb-2">Simple Scale & Fade</h3>
                <p className="text-soft-gray text-sm">Basic scale and fade animation with spring easing</p>
              </motion.div>
              
              <motion.div
                className="card-chart"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-ghost-white mb-2">Chart Card Animation</h3>
                <p className="text-soft-gray text-sm">Applied to an existing chart card component</p>
              </motion.div>
            </div>
          </section>
        </TabContent>
        
        {/* 3. Hover Reveal Effects */}
        <TabContent isActive={activeTab === 'hover'}>
          <section className="mb-12">
            <h2 className="text-2xl font-heading text-ghost-white mb-4">Hover Reveal Effects</h2>
            <p className="text-soft-gray mb-6">Dark OS-style motion with transformations, glow, and text shifts.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-hover-reveal bg-panel-dark rounded-lg p-4">
                <h3 className="text-ghost-white mb-2">Card Hover</h3>
                <p className="text-soft-gray text-sm">Scale up & shadow increase</p>
              </div>
              
              <div className="card-hover-reveal card-chart">
                <h3 className="text-ghost-white mb-2">Chart Card</h3>
                <p className="text-soft-gray text-sm">With chart card styling</p>
              </div>
              
              <div className="card-hover-reveal card-insight">
                <h3 className="text-ghost-white mb-2">Insight Card</h3>
                <p className="text-soft-gray text-sm">With insight card styling</p>
              </div>
            </div>
          </section>
        </TabContent>
        
        {/* 4. Command Palette */}
        <TabContent isActive={activeTab === 'command'}>
          <section className="mb-12">
            <h2 className="text-2xl font-heading text-ghost-white mb-4">Command Palette Pop-up</h2>
            <p className="text-soft-gray mb-6">macOS/Spotlight inspired command input with backdrop blur and quick fade-in.</p>
            
            <div className="glass-panel mb-6 p-6">
              <button 
                onClick={() => setShowCommandPalette(true)} 
                className="btn btn-accent mb-4"
              >
                Show Command Palette
              </button>
              
              <p className="text-soft-gray text-sm">
                Click the button above to see the command palette animation. 
                The effect uses backdrop blur, a quick fade-in, and gentle scale animation.
              </p>
            </div>
          </section>
        </TabContent>
      </div>
      
      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      >
        <div className="mb-4 border-b border-slate-blue pb-3">
          <input 
            type="text" 
            className="w-full bg-transparent text-ghost-white border-none outline-none text-lg" 
            placeholder="Search commands..."
            autoFocus
          />
        </div>
        
        <div>
          {[
            { icon: '⚡️', name: 'Power Actions', desc: 'System commands and quick tools' },
            { icon: '🔍', name: 'Search Results', desc: 'Find in project, Go to file' },
            { icon: '📊', name: 'View Analytics', desc: 'Performance metrics and insights' },
          ].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center p-2 rounded hover:bg-panel-darker transition-all cursor-pointer"
            >
              <div className="mr-3 text-xl">{item.icon}</div>
              <div>
                <div className="text-ghost-white">{item.name}</div>
                <div className="text-soft-gray text-sm">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </CommandPalette>
    </div>
  );
} 