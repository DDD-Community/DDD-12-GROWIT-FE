'use client';

import { useState } from 'react';
import Image from 'next/image';
import Section from '@/shared/components/layout/Section';
import Button from '@/shared/components/input/Button';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';
import LandingPageCommonStyle from '../constants';

import { EarlyBirdModal } from '@/feature/customerEvent/earlyBirdModal';

export const LaunchSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Section className="relative w-full flex flex-col gap-y-7 items-center justify-center overflow-hidden px-5 md:px-0 bg-bg-default">
      {/* 배경 & 오버레이 */}
      <div className="absolute inset-0 z-10 pointer-events-none landing-ten-bg" />
      <MotionWrapper
        {...LandingPageCommonStyle.fadeIn.default}
        className="relative z-20 flex flex-col gap-y-4 items-center text-center animate-fade-in"
      >
        <Image src="/landing/logo.png" width={64} height={64} alt="app-logo" />
        <h2 className="bg-linear-to-brand text-4xl font-extrabold leading-tight">2월 APP 런칭</h2>
      </MotionWrapper>

      <MotionWrapper
        {...LandingPageCommonStyle.fadeIn.default}
        className="relative z-20 flex flex-col gap-y-6 text-center items-center"
      >
        <p className="text-sm font-medium md:text-base lg:text-xl text-text-secondary">
          얼리버드 신청하고, <br /> 앱 출시 소식을 빠르게 받아보세요.
        </p>

        <Button size="lg" text="얼리버드 신청하기" variant="primary" onClick={handleOpenModal} />
      </MotionWrapper>
      {/* 모달 컴포넌트 */ <EarlyBirdModal open={isModalOpen} onClose={handleCloseModal} onSuccessSubmit={() => {}} />}
    </Section>
  );
};
