'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import Button from '@/shared/components/input/Button/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Z_INDEX } from '@/shared/lib/z-index';

const STORAGE_KEY = 'last-visited-date';

export const AttendanceStreakPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const checkAndShowPopup = () => {
      const today = new Date().toDateString(); // YYYY-MM-DD 형식
      const lastShownDate = localStorage.getItem(STORAGE_KEY);

      if (!lastShownDate) {
        // 첫 방문이거나 저장된 값이 없는 경우
        localStorage.setItem(STORAGE_KEY, today);
        setIsOpen(true);
      } else if (lastShownDate !== today) {
        // 마지막으로 본 날짜가 오늘과 다른 경우 (어제나 과거)
        localStorage.setItem(STORAGE_KEY, today);
        setIsOpen(true);
      }
    };
    checkAndShowPopup();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 max-w-md mx-auto flex items-center justify-center ${Z_INDEX.POPUP}`}
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative w-full h-full">
            <Image src="/home/popup-bg.png" alt="popup background" fill className="object-cover" priority />
            {/* <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button> */}
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
                  축하해요!
                </h2>
                <p className="title-2-bold text-primary-normal">
                  그로롱과의 친밀도가 <br /> 한 단계 올랐어요!
                </p>
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
                  src="/home/grorong-love.png"
                  alt="grorong clapping"
                  width={250}
                  height={250}
                  className="drop-shadow-lg mb-6"
                />
                <p className="text-center body-1-normal text-primary-normal">
                  3일 연속으로 출석하면, <br /> 또 다른 그로롱이 기다리고 있어요!{' '}
                </p>
              </motion.div>
              <div className="max-w-sm mx-auto w-full">
                <Button size="lg" text="확인" onClick={handleClose} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
