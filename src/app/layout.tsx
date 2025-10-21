import type { Metadata } from 'next';
import { startMSWServer } from '@/mocks/server';
import localFont from 'next/font/local';
import MSWClientProvider from '@/mocks/mswClientProvider';
import { ToastProvider } from '@/shared/components/feedBack/toast';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';

/** 루트 레이아웃 컴포넌트는 서버 컴포넌트이니 서버용 MSW 초기화 코드는 여기 맨위에서 실행하도록 했습니다 */
import('@/mocks/server').then(async () => {
  await startMSWServer();
});

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Growit',
  description: '주간 목표 설정과 투두 관리를 통해 목표를 달성하세요. Growit과 함께 성장하세요.',
  icons: {
    icon: '/logo-favicon.svg',
    shortcut: '/logo-favicon.svg',
    apple: '/logo-favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-W8GCRPWX" />
      <body className={`${pretendard.variable} flex h-[100dvh] font-pretendard pretendard bg-[#1B1C1E]`}>
        <MSWClientProvider>
          <ToastProvider>{children}</ToastProvider>
        </MSWClientProvider>
      </body>
    </html>
  );
}
