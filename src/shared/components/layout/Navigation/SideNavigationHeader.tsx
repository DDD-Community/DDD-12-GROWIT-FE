import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Button from '@/shared/components/input/Button';
import { useRouter } from 'next/navigation';

interface SideNavigationHeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  hover: boolean;
  setHover: (hover: boolean) => void;
}

export const SideNavigationHeader = ({ isOpen, hover, setIsOpen, setHover }: SideNavigationHeaderProps) => {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="open-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full flex items-center justify-between pl-2"
        >
          <Link href={'/home'}>
            <Image src="/icon/growit-title-logo.svg" alt="icon of growit" width={100} height={32} />
          </Link>
          <Button
            variant="tertiary"
            layout="icon-only"
            onClick={() => {
              setIsOpen(!isOpen);
              setHover(false);
            }}
            icon={<Image src="/icon/sidebar.svg" alt="control-sidebar" width={24} height={24} />}
            size="sm"
          />
        </motion.div>
      ) : (
        <motion.div
          key="closed-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Button
              variant="tertiary"
              layout="icon-only"
              icon={
                hover ? (
                  <Image src="/icon/sidebar.svg" alt="control-sidebar" width={24} height={24} />
                ) : (
                  <Image src="/logo-favicon.svg" alt="icon of growit" width={24} height={24} />
                )
              }
              onClick={() => {
                if (hover) setIsOpen(true);
                else router.push('home');
              }}
              size="sm"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
