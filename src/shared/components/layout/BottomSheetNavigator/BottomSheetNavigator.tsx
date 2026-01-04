'use client';

import { createContext, useContext, useState } from 'react';
import type { BottomSheetNavigationContextType, Screen } from './types';
import { AnimatePresence, motion } from 'motion/react';

export const BottomSheetNavigationContext = createContext<BottomSheetNavigationContextType>({
  stack: [],
  push: () => {},
  pop: () => {},
});

export const BottomSheetNavigator = ({ children }: { children: React.ReactNode }) => {
  const [stack, setStack] = useState<Screen[]>(() => [{ key: 1, node: children }]);

  const push = (node: React.ReactNode) => {
    setStack(prev => [...prev, { key: stack.length + 1, node }]);
  };

  const pop = () => {
    setStack(prev => prev.slice(0, -1));
  };

  return (
    <BottomSheetNavigationContext.Provider value={{ stack, push, pop }}>
      <div className="w-full h-full overflow-hidden relative">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={stack[stack.length - 1].key}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            {stack[stack.length - 1].node}
          </motion.div>
        </AnimatePresence>
      </div>
    </BottomSheetNavigationContext.Provider>
  );
};

export const useBottomSheetNavigator = () => {
  const context = useContext(BottomSheetNavigationContext);
  if (!context) {
    throw new Error('useBottomSheetNavigator must be used within a BottomSheetNavigationProvider');
  }
  return context;
};
