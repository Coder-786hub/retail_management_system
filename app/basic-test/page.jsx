'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestPage() {
  const [activeTab, setActiveTab] = useState('tab1');
  
  return (
    <div className="min-h-screen bg-obsidian p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading text-ghost-white mb-8">Basic Test Page</h1>
        
        <div className="flex space-x-4 mb-8">
          <button 
            onClick={() => setActiveTab('tab1')} 
            className={`px-4 py-2 rounded-lg ${activeTab === 'tab1' ? 'bg-panel-dark text-cyber-teal' : 'bg-panel-darker text-soft-gray'}`}
          >
            Tab 1
          </button>
          <button 
            onClick={() => setActiveTab('tab2')} 
            className={`px-4 py-2 rounded-lg ${activeTab === 'tab2' ? 'bg-panel-dark text-cyber-teal' : 'bg-panel-darker text-soft-gray'}`}
          >
            Tab 2
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'tab1' && (
              <div className="glass-panel p-6">
                <h2 className="text-2xl font-heading text-ghost-white mb-4">Tab 1 Content</h2>
                <p className="text-soft-gray">This is the content for tab 1</p>
              </div>
            )}
            
            {activeTab === 'tab2' && (
              <div className="glass-panel p-6">
                <h2 className="text-2xl font-heading text-ghost-white mb-4">Tab 2 Content</h2>
                <p className="text-soft-gray">This is the content for tab 2</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 