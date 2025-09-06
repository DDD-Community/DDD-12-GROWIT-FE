'use client';

import Image from 'next/image';
import Button from '@/shared/components/input/Button';
import { useRouter } from 'next/navigation';

const FooterSection = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <footer className="relative py-20 px-4 bg-[#0A0A0A] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#35D942]/20 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            지금 바로 시작하고
            <br />
            <span className="text-[#35D942]">나의 성장을 기록하세요</span>
          </h2>
          
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            매일의 작은 기록이 모여 큰 성장이 됩니다.
            GROWIT과 함께 더 나은 내일을 만들어가세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-[#35D942] text-black hover:bg-[#35D942]/90 font-semibold px-8 py-3 rounded-full"
              onClick={handleGetStarted}
            >
              무료로 시작하기
            </Button>
          </div>

          {/* App download badges */}
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="inline-block hover:opacity-80 transition-opacity"
              aria-label="Download on App Store"
            >
              <div className="bg-black border border-gray-800 rounded-xl px-6 py-3 flex items-center gap-3">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </div>
            </a>
            
            <a
              href="#"
              className="inline-block hover:opacity-80 transition-opacity"
              aria-label="Get it on Google Play"
            >
              <div className="bg-black border border-gray-800 rounded-xl px-6 py-3 flex items-center gap-3">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35l8.26 8.26L3 20.5m13.81-5.38L13.1 12l3.71-3.12 3.08 1.72c.64.35.64 1.45 0 1.8l-3.08 1.72M5 3l9.09 5.09L5 17.17V3z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer links and info */}
        <div className="border-t border-gray-800 pt-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo and description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#35D942] rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">G</span>
                </div>
                <span className="text-xl font-bold text-white">GROWIT</span>
              </div>
              <p className="text-gray-400 text-sm">
                누구나 더 나은 내일로 성장할 수 있도록,
                <br />
                GROWIT이 함께합니다.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-white mb-4">서비스</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-[#35D942] text-sm transition-colors">주요 기능</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-[#35D942] text-sm transition-colors">사용 방법</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-[#35D942] text-sm transition-colors">사용자 후기</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4">지원</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#35D942] text-sm transition-colors">도움말</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#35D942] text-sm transition-colors">문의하기</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#35D942] text-sm transition-colors">개인정보처리방침</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#35D942] text-sm transition-colors">이용약관</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 GROWIT. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;