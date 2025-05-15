import React, { useState } from 'react';
import classNames from 'classnames';

interface Tab {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TabGroup: React.FC<TabGroupProps> = ({
  tabs,
  activeTabId,
  onChange,
  variant = 'pills',
  size = 'md',
  className,
}) => {
  const [activeId, setActiveId] = useState(activeTabId || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveId(tabId);
    onChange?.(tabId);
  };

  const getTabClasses = (tabId: string) => {
    const isActive = tabId === activeId;
    
    const baseClasses = classNames(
      'flex items-center transition-all duration-300 relative',
      {
        // Size variations
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2': size === 'md',
        'px-5 py-2.5 text-lg': size === 'lg',
      }
    );
    
    if (variant === 'pills') {
      return classNames(
        baseClasses,
        'rounded-lg hover:bg-panel-lighter',
        {
          'bg-panel-darker text-text-primary': isActive,
          'text-text-muted hover:text-text-primary': !isActive,
        }
      );
    }
    
    return classNames(
      baseClasses,
      'border-b-2 rounded-none',
      {
        'border-neon-green text-text-primary': isActive,
        'border-transparent text-text-muted hover:text-text-primary hover:border-zinc-700': !isActive,
      }
    );
  };

  return (
    <div className={classNames('flex', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={getTabClasses(tab.id)}
          onClick={() => handleTabChange(tab.id)}
          type="button"
        >
          {tab.icon && (
            <span className={classNames('mr-2', { 'text-neon-green': tab.id === activeId })}>
              {tab.icon}
            </span>
          )}
          {tab.label}
          
          {variant === 'pills' && tab.id === activeId && (
            <span className="absolute inset-0 rounded-lg animate-glow opacity-20" />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabGroup; 