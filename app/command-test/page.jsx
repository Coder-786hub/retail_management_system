'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simplified CommandPalette component
const SimpleCommandPalette = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-gunmetal rounded-lg p-6 w-full max-w-lg"
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

export default function CommandTest() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-obsidian p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-heading text-ghost-white mb-8">Command Palette Test</h1>
        
        <button 
          className="px-4 py-2 bg-panel-dark text-ghost-white rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          Open Command Palette
        </button>
        
        <SimpleCommandPalette
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="text-ghost-white">
            <h2 className="text-xl mb-4">Command Palette</h2>
            <p className="mb-4">This is a simplified command palette test.</p>
            <input 
              type="text" 
              className="w-full bg-eclipse text-ghost-white px-3 py-2 rounded-lg"
              placeholder="Type a command..."
              autoFocus
            />
          </div>
        </SimpleCommandPalette>
      </div>
    </div>
  );
} 