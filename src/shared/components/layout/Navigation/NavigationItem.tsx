import { AnimatePresence, motion } from 'framer-motion';
import type { NavigationRoute } from '@/shared/constants/routes';

interface NavigationItemProps {
  isOpen: boolean;
  item: NavigationRoute;
}

const sidebarInitalAnimation = {
  opacity: 0,
  x: -16,
  width: 0,
};

const sidebarDuringAnimation = {
  opacity: 1,
  x: 0,
  width: 'auto',
};

const sidebarExitAnimation = {
  opacity: 0,
  x: 0,
  width: 0,
};

export const NavigationItem = ({ isOpen, item }: NavigationItemProps) => {
  const IconComponent = item.icon;

  return (
    <div className={`w-full flex gap-2 ${isOpen ? 'justify-start' : 'justify-center'}`}>
      <IconComponent />
      <AnimatePresence>
        {isOpen && (
          <motion.span
            key={`${item.path}-text`}
            className={`whitespace-nowrap text-primary-normal font-semibold text-xs md:text-base`}
            initial={sidebarInitalAnimation}
            animate={sidebarDuringAnimation}
            exit={sidebarExitAnimation}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {item.title}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
