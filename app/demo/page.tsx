'use client';

import ThemeDemo from '../components/demo/ThemeDemo';

const GlassmorphismBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-obsidian" />
    
    {/* Background elements to show through glass */}
    <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-cyber-teal/5 blur-3xl" />
    <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-laser-purple/5 blur-3xl" />
    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-cool-indigo/5 blur-3xl" />
    
    {/* Subtle grid pattern */}
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    />
  </div>
);

export default function DemoPage() {
  return (
    <>
      <GlassmorphismBackground />
      <div className="relative z-10">
        <ThemeDemo />
      </div>
    </>
  );
} 