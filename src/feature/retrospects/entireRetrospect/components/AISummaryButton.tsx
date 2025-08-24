import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AISummrayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  status?: 'idle' | 'loading' | 'error' | 'success';
  icon?: React.ReactNode;
  className?: string;
}

export const AISummaryButton = ({ text, status = 'idle', icon, className, ...props }: AISummrayButtonProps) => {
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
      className={`min-w-[146px] rounded-lg cursor-pointer bg-gradient-to-r from-[rgba(128,245,14,1)] via-[rgba(120,193,241,1)] to-[rgba(204,173,253,1)]
      bg-white py-[10px] px-[18px] p-3 body-1-bold
      shadow-xs
       ${className}`}
      onClick={e => props.onClick && props.onClick(e)}
      disabled={props.disabled}
      type="button"
    >
      {
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
                  stroke={'black'}
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
                className="flex justify-center items-center gap-3"
              >
                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.6041 8.89537L4.0339 15.4655M4.74296 10.6973L1.52479 9.93712C1.17073 9.85348 1.0462 9.41392 1.30269 9.15651L3.86198 6.59721C4.0339 6.42529 4.26716 6.32679 4.51156 6.32493L7.39704 6.29984M11.0315 2.99803C13.1791 4.46261 15.0368 6.32028 16.5014 8.4679M8.80121 14.7565L9.56138 17.9746C9.64502 18.3287 10.0846 18.4532 10.342 18.1967L12.9013 15.6374C13.0732 15.4655 13.1717 15.2323 13.1736 14.9879L13.1987 12.1024M17.0525 6.95778L17.8033 3.34466C18.0078 2.36146 17.138 1.49164 16.1548 1.69608L12.5416 2.44696C11.4776 2.66813 10.5018 3.19504 9.73423 3.96358L6.76976 6.92712C5.63881 8.05807 4.9028 9.52451 4.67047 11.1071L4.66025 11.1749C4.51342 12.1851 4.85169 13.2045 5.57283 13.9266C6.29396 14.6477 7.31433 14.986 8.32448 14.8382L8.39232 14.828C9.97492 14.5966 11.4414 13.8597 12.5723 12.7287L15.5359 9.7652C16.3044 8.9976 16.8313 8.02183 17.0525 6.95778Z"
                    stroke="#171719"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {text}
              </motion.span>
            )
          )}
        </AnimatePresence>
      }
    </motion.button>
  );
};
