'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoCompletedPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TodoCompletedPopup = ({ isOpen, onClose }: TodoCompletedPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 max-w-md mx-auto flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative w-full h-full">
            <Image src="/home/popup-bg.png" alt="popup background" fill className="object-cover" priority />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: 'easeOut',
                }}
                className="text-center"
              >
                <h2
                  className="text-lg font-bold mb-2"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(128, 245, 14, 1), rgba(120, 193, 241, 1), rgba(204, 173, 253, 1))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  오늘도 한 걸음 전진!
                </h2>
                <p className="title-2-bold text-primary-normal">투두 완료를 축하드려요</p>
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="mb-6"
              >
                <Image
                  src="/home/grorong-clapping.png"
                  alt="grorong clapping"
                  width={120}
                  height={120}
                  className="drop-shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
