type LogLevel = 'info' | 'warn' | 'error';

const sendLog = (level: LogLevel, message: string, data?: unknown) => {
  fetch('/api/debug', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level, message, data }),
  }).catch(() => {
    // 실패해도 무시 (디버깅용이므로)
  });
};

// Tree-shaking을 위한 조건부 export
export const debugLog =
  process.env.NODE_ENV === 'development'
    ? (message: string, data?: unknown) => sendLog('info', message, data)
    : () => {};

export const debugWarn =
  process.env.NODE_ENV === 'development'
    ? (message: string, data?: unknown) => sendLog('warn', message, data)
    : () => {};

export const debugError =
  process.env.NODE_ENV === 'development'
    ? (message: string, data?: unknown) => sendLog('error', message, data)
    : () => {};
