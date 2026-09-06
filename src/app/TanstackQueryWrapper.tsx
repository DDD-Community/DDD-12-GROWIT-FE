'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then(module => module.ReactQueryDevtools),
  { ssr: false }
);

export default function TanstackQueryWrapper({ children }: { children: React.ReactNode }) {
  // Suspense 사용 시 매 렌더마다 QueryClient가 새로 생성되면
  // 캐시가 초기화되어 무한 요청이 발생할 수 있으므로 1회만 생성
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
