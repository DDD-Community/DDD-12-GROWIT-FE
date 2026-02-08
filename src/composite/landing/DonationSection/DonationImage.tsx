'use client';

import Image from 'next/image';
import { AnimatePresence } from 'motion/react';
import { useCopyAccountContext } from './CopyAccountContext';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';
import { ToolTip } from '@/shared/components/display/ToolTip';

const Assets = {
  plz: '/landing/donation-plz.png',
  thanks: '/landing/donation-thanks.png',
};

export const DonationImage = () => {
  const { isCopied } = useCopyAccountContext();

  const renderToolTipText = () => {
    if (isCopied) {
      return '보내주신 마음 잊지 않고 \n 더 열심히 할게요!';
    }
    return '조금만 도와주실 수 있나요?';
  };

  return (
    <div className="w-80 md:w-auto h-111.75 flex items-start md:items-center justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <MotionWrapper
          key={isCopied ? 'thanks' : 'plz'}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <article className="relative">
            <Image
              src={isCopied ? Assets.thanks : Assets.plz}
              width={350}
              height={650}
              sizes="(max-width: 768px) 200px, 350px"
              className="w-50 md:w-87.5 h-auto shrink-0"
              alt="donation-section-image"
            />
            <ToolTip text={renderToolTipText()} position="top-left" tailPosition="top-right" />
          </article>
        </MotionWrapper>
      </AnimatePresence>
    </div>
  );
};
