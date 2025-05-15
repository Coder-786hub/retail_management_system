'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FadeInView - Simple fade in animation wrapper
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {object} props.delay - Optional delay for the animation (in seconds)
 * @param {string} props.className - Optional CSS classes
 * @param {object} props.style - Optional inline styles
 */
export const FadeInView = ({ 
  children, 
  delay = 0, 
  className = '', 
  style = {},
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay }}
    className={className}
    style={style}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * CardAnimation - MacOS-style card animation with scale and fade
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {number} props.delay - Optional delay for the animation (in seconds)
 * @param {string} props.className - Optional CSS classes
 */
export const CardAnimation = ({ 
  children, 
  delay = 0, 
  className = '',
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1],
      delay
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * SlideInView - Slide in animation
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.direction - Direction to slide from ('up', 'down', 'left', 'right')
 * @param {number} props.distance - Distance to slide from (in pixels)
 * @param {number} props.delay - Optional delay for the animation (in seconds)
 * @param {string} props.className - Optional CSS classes
 */
export const SlideInView = ({
  children,
  direction = 'up',
  distance = 20,
  delay = 0,
  className = '',
  ...props
}) => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };
  
  const initial = directionMap[direction] || directionMap.up;
  
  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggeredList - Staggered animation for list elements
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements (should be an array)
 * @param {number} props.staggerDelay - Delay between each child animation
 * @param {string} props.className - Optional CSS classes
 */
export const StaggeredList = ({
  children,
  staggerDelay = 0.05,
  className = '',
  ...props
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * CommandPalette - macOS spotlight-style command palette
 * @param {object} props - Component props
 * @param {boolean} props.isOpen - Whether the command palette is open
 * @param {function} props.onClose - Function to call when the command palette is closed
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.className - Optional CSS classes for the modal content
 */
export const CommandPalette = ({
  isOpen,
  onClose,
  children,
  className = '',
  ...props
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="command-palette-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`command-palette w-full max-w-2xl p-4 ${className}`}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/**
 * TypewriterText - Simple typewriter effect
 * @param {object} props - Component props
 * @param {string} props.text - The text to animate
 * @param {number} props.speed - The speed of the typewriter (steps per second)
 * @param {string} props.className - Optional CSS classes
 */
export const TypewriterText = ({
  text,
  speed = 30,
  className = '',
  ...props
}) => (
  <div className={`typing ${className}`} style={{ width: `${text.length}ch` }} {...props}>
    {text}
  </div>
);

/**
 * MatrixScanEffect - Matrix-style scanning effect
 * Apply to any element to add a matrix scan line effect
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {boolean} props.active - Whether the effect is active
 * @param {string} props.className - Optional CSS classes
 */
export const MatrixScanEffect = ({
  children,
  active = false,
  className = '',
  ...props
}) => (
  <div className={`${active ? 'matrix-reveal' : ''} ${className}`} {...props}>
    {children}
  </div>
);

/**
 * NeuralRainfall - Neural network inspired rainfall effect
 * A softer, more abstract version of the classic Matrix rain effect
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {boolean} props.active - Whether the effect is active
 * @param {number} props.dropCount - Number of rainfall drops to render
 * @param {string} props.className - Optional CSS classes
 */
export const NeuralRainfall = ({
  children,
  active = false,
  dropCount = 20,
  className = '',
  ...props
}) => {
  // Create an array of drops with random positions and delays
  const raindrops = React.useMemo(() => {
    return Array.from({ length: dropCount }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = 2 + Math.random() * 3;
      const height = 30 + Math.random() * 70;
      const width = 1 + Math.random() * 2;
      const opacity = 0.3 + Math.random() * 0.7;
      
      return {
        id: i,
        style: {
          left: `${left}%`,
          height: `${height}px`,
          width: `${width}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          opacity: opacity
        }
      };
    });
  }, [dropCount]);

  return (
    <div 
      className={`neural-rainfall ${active ? 'neural-rainfall-active' : ''} ${className}`} 
      {...props}
    >
      {active && raindrops.map(drop => (
        <div 
          key={drop.id} 
          className="neural-rainfall-drop"
          style={drop.style}
        />
      ))}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

/**
 * PulseGlowElement - Element with a pulsing glow effect
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.color - Color variant ('teal', 'rose', 'indigo', 'green', 'purple')
 * @param {string} props.className - Optional CSS classes
 */
export const PulseGlowElement = ({
  children,
  color = 'teal',
  className = '',
  ...props
}) => {
  const colorClassMap = {
    teal: 'pulse-glow',
    rose: 'pulse-glow-rose',
    indigo: 'pulse-glow-indigo',
    green: 'pulse-glow-green',
    purple: 'pulse-glow-purple'
  };
  
  const colorClass = colorClassMap[color] || 'pulse-glow';
  
  return (
    <div className={`${colorClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * FadeInUpList - List with items that fade in from bottom to top
 * @param {object} props - Component props
 * @param {Array} props.items - Array of items to render
 * @param {function} props.renderItem - Function to render each item
 * @param {string} props.className - Optional CSS classes for the container
 * @param {string} props.itemClassName - Optional CSS classes for each item
 */
export const FadeInUpList = ({
  items = [],
  renderItem,
  className = '',
  itemClassName = '',
}) => (
  <div className={className}>
    {items.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.25,
          delay: index * 0.05,
        }}
        className={itemClassName}
      >
        {renderItem(item, index)}
      </motion.div>
    ))}
  </div>
);

/**
 * AnimatedTabs - Animated tab interface with smooth transitions
 * @param {object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with { id, label }
 * @param {string} props.activeTab - ID of the active tab
 * @param {function} props.onChange - Function called when tab is changed
 * @param {React.ReactNode} props.children - Tab content (should be conditionally rendered)
 * @param {string} props.className - Optional CSS classes for the container
 * @param {string} props.tabClassName - Optional CSS classes for each tab
 * @param {string} props.activeTabClassName - Optional CSS classes for the active tab
 */
export const AnimatedTabs = ({
  tabs = [],
  activeTab,
  onChange,
  children,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
}) => (
  <div className={className}>
    <div className="flex space-x-1 mb-4 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`${tabClassName} px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === tab.id 
              ? `${activeTabClassName} bg-panel-dark text-cyber-teal border border-cyber-teal/30 pulse-glow` 
              : 'bg-panel-darker text-soft-gray hover:text-ghost-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </div>
); 