'use client';

import Image from 'next/image';
import Button from '@/shared/components/input/Button/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Z_INDEX } from '@/shared/lib/z-index';

const STORAGE_KEY = 'last-visited-date';

export const AttendanceStreakPopup = ({ mood }: { mood: 'HAPPY' | 'NORMAL' | 'SAD' }) => {
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

  const renderTitle = () => {
    switch (mood) {
      case 'HAPPY':
        return (
          <p className="title-2-bold text-primary-normal">
            그로롱과의 친밀도가 <br /> MAX에 도달했어요!
          </p>
        );
      default:
        return (
          <p className="title-2-bold text-primary-normal">
            그로롱과의 친밀도가 <br /> 한 단계 올랐어요!
          </p>
        );
    }
  };

  const renderMessage = () => {
    switch (mood) {
      case 'HAPPY':
        return (
          <p className="text-center body-1-normal text-primary-normal">
            지금처럼 계속 이어간다면, <br />
            그로롱은 늘 곁에서 응원할 거예요!
          </p>
        );
      default:
        return (
          <p className="text-center body-1-normal text-primary-normal">
            3일 연속으로 출석하면, <br /> 또 다른 그로롱이 기다리고 있어요!{' '}
          </p>
        );
    }
  };

  const renderImage = () => {
    switch (mood) {
      case 'HAPPY':
        return (
          <Image
            src="/home/grorong-love-max.png"
            alt="grorong"
            width={250}
            height={250}
            className="drop-shadow-lg mb-6"
          />
        );
      default:
        return (
          <Image src="/home/grorong-love.png" alt="grorong" width={250} height={250} className="drop-shadow-lg mb-6" />
        );
    }
  };

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
                {renderTitle()}
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
                {renderImage()}
                {renderMessage()}
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
