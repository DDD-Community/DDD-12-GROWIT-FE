'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  isExisting: boolean;
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type'], duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'warning', duration = 2500) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type, duration, isExisting: false };

    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  };

  const hideToast = (id: string) => {
    // 먼저 isExiting라는 플래그 변수를 true로 설정하여 exit 애니메이션 시작
    setToasts(prev => prev.map(toast => (toast.id === id ? { ...toast, isExisting: true } : toast)));

    // 애니메이션 완료 후 실제로 토스트 제거 (300ms는 애니메이션 duration)
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  };
  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastItem key={toast.id} toast={toast} onClose={() => hideToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.92499 10.9999C1.92499 5.98794 5.98799 1.92493 11 1.92493C16.0119 1.92493 20.0749 5.98794 20.0749 10.9999C20.0749 16.0119 16.0119 20.0749 11 20.0749C5.98799 20.0749 1.92499 16.0119 1.92499 10.9999ZM15.2594 9.05278C15.5763 8.72539 15.5678 8.2031 15.2404 7.88621C14.913 7.56932 14.3907 7.57784 14.0738 7.90523L9.78756 12.3336L7.9269 10.406C7.61046 10.0782 7.08818 10.069 6.76036 10.3854C6.43254 10.7019 6.42331 11.2242 6.73975 11.552L9.19318 14.0936C9.34851 14.2546 9.56253 14.3455 9.78619 14.3457C10.0099 14.3458 10.224 14.2552 10.3795 14.0944L15.2594 9.05278Z"
              fill="#1ED45A"
            />
          </svg>
        );
      case 'error':
        return (
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.924881 10C0.924881 4.98807 4.98788 0.925049 9.99985 0.925049C15.0118 0.925049 19.0748 4.98807 19.0748 10C19.0748 15.012 15.0118 19.075 9.99985 19.075C4.98788 19.075 0.924881 15.012 0.924881 10ZM9.99993 5.50829C10.4556 5.50829 10.8249 5.87766 10.8249 6.33329V10.4583C10.8249 10.9139 10.4556 11.2833 9.99993 11.2833C9.5443 11.2833 9.17493 10.9139 9.17493 10.4583V6.33329C9.17493 5.87766 9.5443 5.50829 9.99993 5.50829ZM10.9165 13.6666C10.9165 14.1729 10.5061 14.5833 9.99982 14.5833C9.49356 14.5833 9.08316 14.1729 9.08316 13.6666C9.08316 13.1604 9.49356 12.75 9.99982 12.75C10.5061 12.75 10.9165 13.1604 10.9165 13.6666Z"
              fill="#FF6363"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.91854 2.84201C10.6068 2.53557 11.3928 2.53557 12.081 2.84201C12.5607 3.05559 12.9071 3.4471 13.208 3.87311C13.5064 4.29544 13.8347 4.86408 14.2341 5.55592L18.9191 13.6705C19.3185 14.3624 19.6468 14.931 19.8634 15.4006C20.0818 15.8742 20.2477 16.3699 20.1928 16.8921C20.1141 17.6414 19.7211 18.3221 19.1116 18.7649C18.6868 19.0736 18.1745 19.1777 17.6551 19.2254C17.1402 19.2726 16.4836 19.2726 15.6847 19.2726H6.31484C5.51597 19.2726 4.85937 19.2726 4.34442 19.2254C3.82501 19.1777 3.31279 19.0736 2.88796 18.7649C2.27846 18.3221 1.88548 17.6414 1.80673 16.8921C1.75184 16.3699 1.91773 15.8742 2.13617 15.4006C2.35273 14.931 2.68104 14.3624 3.08049 13.6705L7.76543 5.55593C8.16485 4.86408 8.49314 4.29544 8.79152 3.8731C9.0925 3.4471 9.43882 3.05559 9.91854 2.84201ZM10.9999 7.42468C11.4556 7.42468 11.8249 7.79405 11.8249 8.24968V11.9163C11.8249 12.372 11.4556 12.7413 10.9999 12.7413C10.5443 12.7413 10.1749 12.372 10.1749 11.9163V8.24968C10.1749 7.79405 10.5443 7.42468 10.9999 7.42468ZM11.9165 15.1247C11.9165 15.6309 11.5061 16.0413 10.9998 16.0413C10.4936 16.0413 10.0831 15.6309 10.0831 15.1247C10.0831 14.6184 10.4936 14.208 10.9998 14.208C11.5061 14.208 11.9165 14.6184 11.9165 15.1247Z"
              fill="#FFA938"
            />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <motion.div
      key={toast.id}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.2 }}
      className={cn('flex items-center justify-between p-4 rounded-lg shadow-lg w-[335px] md:w-[420px] bg-gray-500')}
    >
      <div className="flex items-center space-x-3  text-label-normal">
        {getIcon(toast.type)}
        <span className="text-body-2-normal">{toast.message}</span>
      </div>
      <button onClick={onClose} className="ml-4 text-white/80 hover:text-white transition-colors">
        <XIcon className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
