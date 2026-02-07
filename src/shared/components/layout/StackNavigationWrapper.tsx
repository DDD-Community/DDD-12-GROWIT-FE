'use client';

import { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export interface Screen {
  key: number;
  node: React.ReactNode;
}

export interface StackNavigationContextType {
  stack: Screen[];
  push: (node: React.ReactNode) => void;
  pop: () => void;
}

export const StackNavigationContext = createContext<StackNavigationContextType>({
  stack: [],
  push: () => {},
  pop: () => {},
});

export const StackNavigationWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [stack, setStack] = useState<Screen[]>(() => [{ key: 1, node: children }]);

  const push = (node: React.ReactNode) => {
    setStack(prev => [...prev, { key: stack.length + 1, node }]);
  };

  const pop = () => {
    setStack(prev => prev.slice(0, -1));
  };

  return (
    <StackNavigationContext.Provider value={{ stack, push, pop }}>
      <div className={className}>{stack[0].node}</div>
      <AnimatePresence>
        {stack.slice(1).map(screen => (
          <motion.div
            key={screen.key}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 max-sm:flex-col max-w-md w-full h-full mx-auto bg-bg-default"
          >
            {screen.node}
          </motion.div>
        ))}
      </AnimatePresence>
    </StackNavigationContext.Provider>
  );
};

export const useStackNavigation = () => {
  const context = useContext(StackNavigationContext);
  if (!context) {
    throw new Error('useStackNavigation must be used within a StackNavigationWrapper');
  }
  return context;
};
