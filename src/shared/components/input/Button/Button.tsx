'use client';

import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlexBox from '../../foundation/FlexBox';
import type { ButtonVariants, ButtonLayouts, ButtonSize } from '@/shared/components/input/Button/utils/button';
import { getButtonClasses } from '@/shared/components/input/Button/utils/button';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  layout?: ButtonLayouts;
  size: ButtonSize;
  text?: string;
  status?: 'idle' | 'loading' | 'error' | 'success';
  icon?: React.ReactNode;
  className?: string;
}
const Button = ({
  size,
  variant = 'primary',
  layout = 'normal',
  text = '',
  icon,
  onClick,
  disabled = false,
  status = 'idle',
  className = '',
}: ButtonProps) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (status && status !== 'idle') {
      setIsDone(true);
      const timer = setTimeout(() => {
        setIsDone(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg 
      ${getButtonClasses(variant, layout, size, disabled)}
      
      shadow-xs
       ${className}`}
      onClick={e => onClick && onClick(e)}
      disabled={disabled}
    >
      {layout === 'normal' ? (
        <AnimatePresence mode="wait" initial={false}>
          {status === 'loading' ? (
            <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <svg
                aria-hidden="true"
                className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </motion.div>
          ) : status === 'success' && isDone ? (
            <motion.div
              key="success"
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M20 6L9 17L4 12"
                  stroke={`${variant !== 'primary' ? 'white' : 'black'}`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    default: { duration: 0.3 },
                    fill: { duration: 0.2 },
                  }}
                />
              </motion.svg>
              완료
            </motion.div>
          ) : (
            (status === 'idle' || !isDone) && (
              <motion.span
                key="text"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center items-center"
              >
                {text}
              </motion.span>
            )
          )}
        </AnimatePresence>
      ) : layout === 'icon-left' ? (
        <FlexBox className="flex justify-center items-center gap-2">
          {icon}
          <span>{text}</span>
        </FlexBox>
      ) : layout === 'icon-right' ? (
        <FlexBox className="flex justify-center items-center gap-2">
          <span>{text}</span>
          {icon}
        </FlexBox>
      ) : (
        <FlexBox className="justify-center">{icon}</FlexBox>
      )}
    </motion.button>
  );
};

export default Button;
