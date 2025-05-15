'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FadeInView,
  CardAnimation,
  SlideInView,
  StaggeredList,
  CommandPalette,
  TypewriterText,
  MatrixScanEffect,
  NeuralRainfall,
  PulseGlowElement,
  FadeInUpList,
  AnimatedTabs
} from '../components/AnimationComponents';

export default function AnimationExamples() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [activeTab, setActiveTab] = useState('ambient');
  const [matrixTrigger, setMatrixTrigger] = useState(false);
  const [neuralRainActive, setNeuralRainActive] = useState(false);
  
  const toggleCommandPalette = () => {
    setShowCommandPalette(!showCommandPalette);
  };
  
  const triggerMatrixEffect = () => {
    setMatrixTrigger(true);
    setTimeout(() => setMatrixTrigger(false), 1500);
  };
  
  const toggleNeuralRain = () => {
    setNeuralRainActive(!neuralRainActive);
  };
  
  const tabs = [
    { id: 'ambient', label: 'Ambient' },
    { id: 'cards', label: 'Cards' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'hover', label: 'Hover' },
    { id: 'command', label: 'Command' }
  ];
  
  const commandItems = [
    { icon: '⚡️', name: 'Power Actions', desc: 'System commands and quick tools' },
    { icon: '🔍', name: 'Search Results', desc: 'Find in project, Go to file' },
    { icon: '📊', name: 'View Analytics', desc: 'Performance metrics and insights' },
    { icon: '💬', name: 'Chat with AI', desc: 'Get help from the AI assistant' },
    { icon: '⚙️', name: 'Settings', desc: 'Configure application preferences' }
  ];
  
  return (
    <div className="min-h-screen bg-obsidian p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading text-ghost-white mb-2">Animation Effects</h1>
        <p className="text-soft-gray mb-8">Modern UI animations inspired by Raycast, ChatGPT, and Cursor</p>
        
        {/* Navigation Tabs */}
        <AnimatedTabs 
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="mb-8"
        >
          {/* 1. Ambient Glow Effects */}
          {activeTab === 'ambient' && (
            <section className="mb-12">
              <h2 className="text-2xl font-heading text-ghost-white mb-4">Ambient Glow Effects</h2>
              <p className="text-soft-gray mb-6">Matrix-inspired elements that pulse or glow as if being processed by an AI brain.</p>
              
              <NeuralRainfall 
                active={neuralRainActive} 
                dropCount={30}
                className="glass-panel-elevated relative z-10 p-6 mb-8"
              >
                <div className="flex flex-col items-center relative z-10">
                  <h3 className="text-xl font-heading text-cool-indigo mb-3 glow-indigo">Neural Rainfall Effect</h3>
                  <p className="text-soft-gray text-center mb-4">
                    A soft digital drizzle with diffused neon strokes that feels like a neural net processing data.
                    Using vertical gradients, slow drop speed, blurred edges and lower contrast.
                  </p>
                  <button 
                    onClick={toggleNeuralRain} 
                    className="btn btn-accent hover-glow"
                  >
                    {neuralRainActive ? 'Deactivate Effect' : 'Activate Effect'}
                  </button>
                </div>
              </NeuralRainfall>
              
              <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                
                <PulseGlowElement color="green" className="rounded-lg bg-panel-dark p-4">
                  <h3 className="text-toxic-green mb-2">Toxic Green Pulse</h3>
                  <p className="text-soft-gray text-sm">Success state pulsing glow</p>
                </PulseGlowElement>
                
                <PulseGlowElement color="purple" className="rounded-lg bg-panel-dark p-4">
                  <h3 className="text-laser-purple mb-2">Laser Purple Pulse</h3>
                  <p className="text-soft-gray text-sm">AI/Copilot state pulsing glow</p>
                </PulseGlowElement>
                
                <div className="rounded-lg bg-panel-dark p-4">
                  <h3 className="text-cyber-teal text-pulse mb-2">Text Pulse Effect</h3>
                  <p className="text-soft-gray text-sm">Pulsing text glow animation</p>
                </div>
              </StaggeredList>
            </section>
          )}
          
          {/* 2. Card Load Animations */}
          {activeTab === 'cards' && (
            <section className="mb-12">
              <h2 className="text-2xl font-heading text-ghost-white mb-4">Card Load Animations</h2>
              <p className="text-soft-gray mb-6">MacOS-like fluidity with subtle fade & scale with spring easing.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardAnimation className="rounded-lg bg-panel-dark p-4">
                  <h3 className="text-ghost-white mb-2">Simple Scale & Fade</h3>
                  <p className="text-soft-gray text-sm">Basic scale and fade animation with spring easing</p>
                </CardAnimation>
                
                <CardAnimation className="card-chart">
                  <h3 className="text-ghost-white mb-2">Chart Card Animation</h3>
                  <p className="text-soft-gray text-sm">Applied to an existing chart card component</p>
                </CardAnimation>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => setActiveTab('cards')} 
                  className="px-4 py-2 rounded-lg bg-panel-darker text-ghost-white mb-4"
                >
                  Replay Animations
                </button>
                
                <h3 className="text-ghost-white mt-6 mb-2">Staggered Card Reveals</h3>
                <FadeInUpList
                  items={[1, 2, 3, 4, 5, 6]}
                  renderItem={(item) => (
                    <div className="rounded-lg bg-panel-dark p-4">
                      <h3 className="text-ghost-white mb-1">Card {item}</h3>
                      <p className="text-soft-gray text-sm">Staggered reveal timing</p>
                    </div>
                  )}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  itemClassName="mb-4"
                />
              </div>
            </section>
          )}
          
          {/* 3. Terminal-Type Effects */}
          {activeTab === 'terminal' && (
            <section className="mb-12">
              <h2 className="text-2xl font-heading text-ghost-white mb-4">Terminal-Type Effects</h2>
              <p className="text-soft-gray mb-6">Matrix-flavored typing and scanning effects for terminal UI.</p>
              
              <div className="terminal p-6 mb-6">
                <TypewriterText 
                  text="$ initializing system core..." 
                  className="terminal-system mb-4"
                />
                
                <div className="terminal-system mb-4">$ scan network for anomalies</div>
                
                <MatrixScanEffect
                  active={matrixTrigger}
                  className="terminal-trend"
                  onClick={triggerMatrixEffect}
                >
                  NETWORK SCAN COMPLETE: 3 anomalies detected
                </MatrixScanEffect>
                
                <div className="space-y-3 mt-4">
                  <div className="terminal-entry terminal-ai p-1">
                    <span className="text-soft-gray">10:21:04</span> AI interface initialized
                  </div>
                  <div className="terminal-entry terminal-insight p-1">
                    <span className="text-soft-gray">10:21:05</span> Resource optimization complete
                  </div>
                  <div className="terminal-entry terminal-warning p-1">
                    <span className="text-soft-gray">10:21:06</span> Warning: Unusual pattern detected
                  </div>
                </div>
              </div>
              
              <PulseGlowElement color="green">
                <button 
                  onClick={triggerMatrixEffect} 
                  className="px-4 py-2 rounded-lg bg-panel-darker text-ghost-white hover:bg-panel-dark transition-all"
                >
                  Trigger Matrix Scan Effect
                </button>
              </PulseGlowElement>
            </section>
          )}
          
          {/* 4. Hover Reveal Effects */}
          {activeTab === 'hover' && (
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
              
              <div className="mt-8 mb-4">
                <h3 className="text-ghost-white mb-4">Button Hover Effects</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-hover-reveal btn btn-primary">
                    Primary Button
                  </button>
                  
                  <PulseGlowElement className="btn-hover-reveal btn btn-accent">
                    Accent Button + Pulse
                  </PulseGlowElement>
                  
                  <PulseGlowElement color="rose" className="btn-hover-reveal btn btn-danger">
                    Danger Button + Pulse
                  </PulseGlowElement>
                </div>
              </div>
            </section>
          )}
          
          {/* 5. Command Palette */}
          {activeTab === 'command' && (
            <section className="mb-12">
              <h2 className="text-2xl font-heading text-ghost-white mb-4">Command Palette Pop-up</h2>
              <p className="text-soft-gray mb-6">macOS/Spotlight inspired command input with backdrop blur and quick fade-in.</p>
              
              <div className="glass-panel mb-6 p-6">
                <button 
                  onClick={toggleCommandPalette} 
                  className="btn btn-accent mb-4"
                >
                  Show Command Palette
                </button>
                
                <p className="text-soft-gray text-sm">
                  Click the button above to see the command palette animation. 
                  The effect uses backdrop blur, a quick fade-in, and gentle scale animation.
                </p>
              </div>
              
              <div className="scale-in bg-panel-dark rounded-lg p-6">
                <h3 className="text-ghost-white mb-4">Scale-in Animation</h3>
                <p className="text-soft-gray mb-4">
                  This panel uses the scale-in animation class to create a subtle entrance effect
                  similar to how macOS windows appear.
                </p>
                
                <StaggeredList>
                  <div className="rounded bg-panel-darker p-2 mb-2 flex items-center">
                    <div className="w-4 h-4 bg-cyber-teal rounded-full mr-3"></div>
                    <span className="text-ghost-white">First item appears</span>
                  </div>
                  <div className="rounded bg-panel-darker p-2 mb-2 flex items-center">
                    <div className="w-4 h-4 bg-cool-indigo rounded-full mr-3"></div>
                    <span className="text-ghost-white">Second item follows</span>
                  </div>
                  <div className="rounded bg-panel-darker p-2 mb-2 flex items-center">
                    <div className="w-4 h-4 bg-toxic-green rounded-full mr-3"></div>
                    <span className="text-ghost-white">Third item completes</span>
                  </div>
                </StaggeredList>
              </div>
            </section>
          )}
        </AnimatedTabs>
      </div>
      
      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={toggleCommandPalette}
      >
        <div className="mb-4 border-b border-slate-blue pb-3">
          <input 
            type="text" 
            className="w-full bg-transparent text-ghost-white border-none outline-none text-lg" 
            placeholder="Search commands..."
            autoFocus
          />
        </div>
        
        <FadeInUpList
          items={commandItems}
          renderItem={(item) => (
            <div className="flex items-center p-2 rounded hover:bg-panel-darker transition-all cursor-pointer">
              <div className="mr-3 text-xl">{item.icon}</div>
              <div>
                <div className="text-ghost-white">{item.name}</div>
                <div className="text-soft-gray text-sm">{item.desc}</div>
              </div>
            </div>
          )}
        />
      </CommandPalette>
    </div>
  );
} 