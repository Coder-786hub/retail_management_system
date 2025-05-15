import React, { ReactNode } from 'react';
import classNames from 'classnames';
import GlowContainer from './GlowContainer';

interface ColumnProps {
  children: ReactNode;
  title?: string;
  className?: string;
  contentClassName?: string;
  floating?: boolean;
  isActive?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  fixedHeight?: boolean;
  backgroundVariant?: 'default' | 'frosted-gradient' | 'particle-nebula';
}

const Column: React.FC<ColumnProps> = ({
  children,
  title,
  className = '',
  contentClassName = '',
  floating = false,
  isActive = false,
  header,
  footer,
  fixedHeight = false,
  backgroundVariant = 'default',
}) => {
  let variant: 'default' | 'elevated' | 'floating' | 'frosted-gradient' | 'particle-nebula' = floating ? 'floating' : 'elevated';
  
  // Override variant if backgroundVariant is specified (except for default)
  if (backgroundVariant === 'frosted-gradient') {
    variant = 'frosted-gradient';
  } else if (backgroundVariant === 'particle-nebula') {
    variant = 'particle-nebula';
  }
  
  return (
    <GlowContainer 
      variant={variant}
      isActive={isActive}
      className={classNames(
        'flex flex-col h-full overflow-hidden', 
        className
      )}
    >
      {(title || header) && (
        <div className={classNames(
          'flex items-center mb-3 pb-2 panel-header flex-shrink-0',
          isActive ? 'active' : ''
        )}>
          {title && (
            <h3 className="font-heading text-lg font-medium text-text-primary flex-1 overflow-hidden text-ellipsis">
              {title}
            </h3>
          )}
          {header && (
            <div className="flex-shrink-0 ml-2">
              {header}
            </div>
          )}
        </div>
      )}
      
      <div className={classNames(
        'flex-1 overflow-y-auto overflow-x-hidden min-h-0 max-w-full', 
        contentClassName
      )}>
        {children}
      </div>
      
      {footer && (
        <div className="mt-3 pt-3 flex-shrink-0">
          {footer}
        </div>
      )}
    </GlowContainer>
  );
};

export default Column; 