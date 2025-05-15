import React, { useState } from 'react';
import { 
  Button, 
  Badge, 
  Column, 
  GlowContainer, 
  TabGroup 
} from '../ui';

// For demo purposes
const CodeDemo = () => (
  <pre className="bg-panel-darker p-3 rounded-lg overflow-x-auto whitespace-pre text-xs">
    <code className="text-text-primary">
{`// Example component using the theme
const AuditableTerminalPanel = ({ logs, activeTab }) => {
  return (
    <GlowContainer
      variant="elevated"
      isActive={isProcessing}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading">Activity Log</h3>
        <Badge color="primary">Processing</Badge>
      </div>
      <div className="terminal font-mono text-sm">
        {logs.map(log => (
          <div key={log.id} className="mb-2">
            <span className="text-zinc-400">{log.timestamp}</span>
            <span className="text-text-muted"> → </span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </GlowContainer>
  );
}`}
    </code>
  </pre>
);

// Minimal Glassmorphism test component
const TestGlassmorphism = () => (
  <div className="relative py-6 mb-6">
    <div className="absolute inset-0 bg-gradient-to-br from-cyber-teal/5 to-laser-purple/5 z-0"></div>
    <h2 className="text-xl font-heading mb-4 text-center relative z-10">Glassmorphism Test</h2>
    
    <div className="inline-block mx-auto relative z-10" style={{
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      padding: "1rem",
      color: "white",
      maxWidth: "600px",
      width: "100%",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    }}>
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-3 h-3 rounded-full bg-raspberry"></div>
        <div className="w-3 h-3 rounded-full bg-cyber-teal"></div>
        <div className="w-3 h-3 rounded-full bg-cool-indigo"></div>
      </div>
      <p className="text-text-primary">This is a pure CSS glassmorphism test block that demonstrates the proper implementation.</p>
      <ul className="mt-2 text-text-secondary text-sm pl-4 list-disc">
        <li>Semi-transparent background (0.05 opacity)</li>
        <li>Border with slight white opacity (0.1)</li>
        <li>Explicit backdrop-filter and -webkit-backdrop-filter</li>
        <li>Proper z-index hierarchy</li>
      </ul>
    </div>
  </div>
);

const ThemeDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('components');
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleProcessing = () => {
    setIsProcessing(!isProcessing);
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-heading mb-8 text-center">
        <span className="text-neon-green">MORF</span> UI System
      </h1>
      
      <TestGlassmorphism />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Column 
          title="Theme & Components" 
          floating={true} 
          isActive={isProcessing}
        >
          <TabGroup
            tabs={[
              { id: 'components', label: 'Components' },
              { id: 'colors', label: 'Colors' },
              { id: 'typography', label: 'Typography' }
            ]}
            activeTabId={activeTab}
            onChange={setActiveTab}
            className="mb-6"
          />
          
          {activeTab === 'components' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading mb-3">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button glowColor="primary" isActive={true}>Active</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-heading mb-3">Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge color="primary">Primary</Badge>
                  <Badge color="accent" variant="filled">Accent</Badge>
                  <Badge color="warn" pulsing>Warning</Badge>
                  <Badge color="muted">Muted</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-heading mb-3">State Toggle</h3>
                <Button 
                  onClick={toggleProcessing} 
                  glowColor={isProcessing ? "primary" : "none"}
                  isActive={isProcessing}
                >
                  {isProcessing ? "Processing" : "Start Process"}
                </Button>
              </div>
            </div>
          )}
          
          {activeTab === 'colors' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neon-green text-zinc-950 font-bold p-3 rounded-lg text-center">
                Primary
              </div>
              <div className="bg-neon-blue text-zinc-950 font-bold p-3 rounded-lg text-center">
                Accent
              </div>
              <div className="bg-neon-warn text-zinc-950 font-bold p-3 rounded-lg text-center">
                Warning
              </div>
              <div className="bg-panel text-text-primary font-bold p-3 rounded-lg text-center">
                Panel
              </div>
              <div className="bg-panel-darker text-text-primary font-bold p-3 rounded-lg text-center">
                Panel Dark
              </div>
              <div className="bg-panel-lighter text-zinc-950 font-bold p-3 rounded-lg text-center">
                Panel Light
              </div>
            </div>
          )}
          
          {activeTab === 'typography' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-heading">Space Grotesk</h1>
                <p className="text-text-muted">Modern geometric sans-serif for headings</p>
              </div>
              <div>
                <p className="text-lg">Inter</p>
                <p className="text-text-muted">Clean sans-serif for body text</p>
              </div>
              <div>
                <p className="font-mono">IBM Plex Mono</p>
                <p className="text-text-muted font-mono">Precise monospace for terminal content</p>
              </div>
            </div>
          )}
        </Column>
        
        <Column 
          title="Code Example" 
          floating={true}
          isActive={isProcessing}
        >
          <div className="flex items-center justify-between mb-4">
            <Badge color={isProcessing ? "primary" : "muted"} pulsing={isProcessing}>
              {isProcessing ? "Processing" : "Idle"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={toggleProcessing}>
              {isProcessing ? "Stop" : "Start"}
            </Button>
          </div>
          <CodeDemo />
        </Column>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Column 
          title="Default Panel"
          className="md:col-span-1"
        >
          <p className="text-text-muted mb-4">Standard panel with elevated style.</p>
          <Button variant="primary">Action</Button>
        </Column>
        
        <Column 
          title="Floating Panel"
          floating={true}
          className="md:col-span-1"
        >
          <p className="text-text-muted mb-4">3D transform on hover.</p>
          <Button variant="primary">Action</Button>
        </Column>
        
        <Column 
          title="Frosted Gradient Glow"
          backgroundVariant="frosted-gradient"
          className="md:col-span-1"
        >
          <p className="text-text-muted mb-4">Ultra-dark with subtle teal/purple bloom.</p>
          <Button variant="primary">Action</Button>
        </Column>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
        <Column 
          title="Twinkling Particle Grid (Dark Nebula)"
          backgroundVariant="particle-nebula"
          className="md:col-span-1"
        >
          <p className="text-text-muted mb-4">Sci-fi Matrix + MacOS Stage Manager fusion with subtle particle animation.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
          </div>
        </Column>
      </div>
      
      <GlowContainer variant="default" className="max-w-2xl mx-auto">
        <h2 className="text-xl font-heading mb-3">About MORF UI</h2>
        <p className="text-text-muted mb-4">
          A modern, ambient UI system inspired by applications like Raycast, Cursor, and Windsurf.
          Features glassmorphism effects, subtle animations, and a focused information hierarchy.
        </p>
        <div className="flex justify-center">
          <Button variant="primary">
            Read Documentation
          </Button>
        </div>
      </GlowContainer>
    </div>
  );
};

export default ThemeDemo; 