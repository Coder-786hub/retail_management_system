import React, { ReactNode } from 'react';
import classNames from 'classnames';
import ParticleBackground from './ParticleBackground';

interface GlowContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'floating' | 'frosted-gradient' | 'particle-nebula';
  isActive?: boolean;
}

const GlowContainer: React.FC<GlowContainerProps> = ({
  children,
  className = '',
  variant = 'default',
  isActive = false,
}) => {
  const containerClasses = classNames({
    'glass-panel': variant === 'default',
    'glass-panel-elevated': variant === 'elevated',
    'floating-column': variant === 'floating',
    'frosted-gradient-glow': variant === 'frosted-gradient',
    'glass-panel-elevated relative overflow-hidden': variant === 'particle-nebula',
    [className]: Boolean(className),
  });

  return (
    <div className={containerClasses} style={{ position: 'relative' }}>
      {variant === 'particle-nebula' && (
        <ParticleBackground id={`particles-${Math.random().toString(36).substring(7)}`} />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlowContainer; 