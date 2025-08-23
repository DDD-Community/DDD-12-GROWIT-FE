'use client';

import React from 'react';
import Image from 'next/image';

interface OnboardingContentProps {
  desktopImage: string;
  mobileImage: string;
  altText: string;
  characterDesktopImage?: string;
  characterMobileImage?: string;
}

export function OnboardingContent({
  desktopImage,
  mobileImage,
  altText,
  characterDesktopImage,
  characterMobileImage,
}: OnboardingContentProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Desktop version */}
      <div className="hidden md:block relative w-full max-w-[900px] h-[600px]">
        {/* Main content image */}
        <Image
          src={desktopImage}
          alt={altText}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Mobile version */}
      <div className="block md:hidden relative w-full max-w-[350px] h-full max-h-[400px]">
        {/* Main content image */}
        <Image
          src={mobileImage}
          alt={altText}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}