'use client';

import { useState, useEffect } from 'react';

export default function MSWClientProvider({ children }: { children: React.ReactNode }) {
  const [readyToUseMSW, setReadyToUseMSW] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { worker } = await import('./browser');
      await worker.start({
        serviceWorker: { url: '/mockServiceWorker.js' },
        onUnhandledRequest: 'bypass',
      });
      setReadyToUseMSW(true);
    };
    init();
  }, []);

  /** app/layout.tsx는 Next.js에서 서버에서 렌더링될 수도 있기 때문에, window가 없어서 MSW가 setupWorker()에서 터지는 경우가 있습니다. */
  /** 그래서 MSW가 실행될 준비가 된 다음에만 children을 렌더링하도록 하여 자식 컴포넌트에서 fetch 요청을 했을때 404가 뜨지 않도록 보장하였습니다. */
  if (readyToUseMSW) return children;
}
