import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'filled';
  color?: 'primary' | 'accent' | 'warn' | 'muted';
  size?: 'sm' | 'md';
  pulsing?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  color = 'primary',
  size = 'md',
  pulsing = false,
  className = '',
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return variant === 'filled' 
          ? 'bg-zinc-800/70 text-text-primary' 
          : 'text-text-primary bg-zinc-800/50';
      case 'accent':
        return variant === 'filled' 
          ? 'bg-zinc-800/70 text-text-primary' 
          : 'text-text-primary bg-zinc-800/50';
      case 'warn':
        return variant === 'filled' 
          ? 'bg-zinc-800/70 text-text-primary' 
          : 'text-text-primary bg-zinc-800/50';
      case 'muted':
      default:
        return variant === 'filled' 
          ? 'bg-zinc-800/50 text-text-muted' 
          : 'text-text-muted bg-zinc-800/40';
    }
  };

  const badgeClasses = classNames(
    'inline-flex items-center justify-center rounded-full shadow-sm',
    getColorClasses(),
    {
      'text-xs px-2 py-0.5': size === 'sm',
      'text-sm px-2.5 py-0.5': size === 'md',
    },
    className
  );

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge; 