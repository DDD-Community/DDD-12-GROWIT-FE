'use client';

import { useState, useEffect } from 'react';

export default function MSWClientProvider({ children }: { children: React.ReactNode }) {
  const [readyToUseMSW, setReadyToUseMSW] = useState(process.env.NODE_ENV === 'production');

  useEffect(() => {
    const init = async () => {
      if (process.env.NODE_ENV === 'development') {
        try {
          console.log('MSW 초기화 시작...');
          const { worker } = await import('./browser');

          console.log('MSW Worker 로드됨:', worker);
          console.log('MSW 핸들러 목록:', worker.listHandlers());

          await worker.start({
            serviceWorker: { url: '/mockServiceWorker.js' },
            onUnhandledRequest: 'bypass',
            quiet: false, // MSW 로그 활성화
          });

          console.log('MSW가 성공적으로 초기화되었습니다.');
          console.log('등록된 핸들러:', worker.listHandlers());
          setReadyToUseMSW(true);
        } catch (error) {
          console.error('MSW 초기화 실패:', error);
          // MSW 초기화 실패 시에도 앱은 계속 실행
          setReadyToUseMSW(true);
        }
      }
    };
    init();
  }, []);

  /** app/layout.tsx는 Next.js에서 서버에서 렌더링될 수도 있기 때문에, window가 없어서 MSW가 setupWorker()에서 터지는 경우가 있습니다. */
  /** 그래서 MSW가 실행될 준비가 된 다음에만 children을 렌더링하도록 하여 자식 컴포넌트에서 fetch 요청을 했을때 404가 뜨지 않도록 보장하였습니다. */
  const shouldRender = readyToUseMSW || process.env.NODE_ENV === 'production';
  return shouldRender ? children : null;
}
