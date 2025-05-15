import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: 'primary' | 'accent' | 'warn' | 'none';
  isActive?: boolean;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  glowColor = 'none',
  isActive = false,
  className = '',
  iconLeft,
  iconRight,
  ...props
}) => {
  const buttonClasses = classNames(
    'btn',
    {
      'btn-primary': variant === 'primary',
      'bg-panel-darker text-text-muted hover:text-text-primary shadow-sm': 
        variant === 'secondary',
      'bg-transparent hover:bg-panel-darker/30 text-text-muted hover:text-text-primary': 
        variant === 'ghost',
      'px-2 py-1 text-sm': size === 'sm',
      'px-4 py-2': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
      'shadow-md': isActive,
    },
    className
  );

  return (
    <button className={buttonClasses} {...props}>
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button; 