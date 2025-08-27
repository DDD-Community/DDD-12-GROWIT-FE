'use client';

import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export function ProgressIndicator({ currentStep, totalSteps, onStepClick }: ProgressIndicatorProps) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          onClick={() => onStepClick?.(index)}
          className="p-1 cursor-pointer"
          aria-label={`Go to step ${index + 1}`}
        >
          <div
            className={`h-2 rounded-full transition-all duration-300 hover:bg-gray-400 ${
              index === currentStep ? 'w-10 bg-white hover:bg-white' : 'w-2 bg-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
