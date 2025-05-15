'use client';

import React, { useEffect } from 'react';

interface ParticleBackgroundProps {
  id?: string;
  opacity?: number;
}

declare global {
  interface Window {
    particlesJS: any;
  }
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  id = "particles-bg",
  opacity = 0.1
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS(id, {
        particles: {
          number: { value: 35 },
          color: { value: "#00ffc2" },
          shape: { type: "circle" },
          opacity: {
            value: 0.25,
            anim: { enable: true, speed: 0.2 }
          },
          size: {
            value: 2.5,
            random: true
          },
          move: {
            enable: true,
            speed: 0.15,
            direction: "none",
            out_mode: "out"
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#00ffc2",
            opacity: 0.03,
            width: 1
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: { 
            onhover: { enable: false }, 
            onclick: { enable: false },
            resize: true
          },
        },
        retina_detect: true
      });
    }

    return () => {
      // Clean up if needed
    };
  }, [id]);

  return (
    <div 
      id={id} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at center, rgba(12, 12, 13, 0.7), rgba(17, 18, 20, 0.7))',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: opacity,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '12px',
      }}
    />
  );
};

export default ParticleBackground; 