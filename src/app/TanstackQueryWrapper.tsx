'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function TanstackQueryWrapper({ children }: { children: React.ReactNode }) {
  // Suspense 사용 시 매 렌더마다 QueryClient가 새로 생성되면
  // 캐시가 초기화되어 무한 요청이 발생할 수 있으므로 1회만 생성
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
