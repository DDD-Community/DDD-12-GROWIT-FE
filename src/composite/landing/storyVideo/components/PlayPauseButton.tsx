'use client';

import { useState } from 'react';

interface PlayPauseButtonProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isHovered: boolean;
}

export const PlayPauseButton = ({ videoRef, isHovered }: PlayPauseButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const showButton = !isPlaying || isHovered;

  return (
    <button
      aria-label={isPlaying ? '영상 일시정지' : '영상 재생'}
      className={`w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center rounded-full bg-black/50 transition-opacity duration-300 ${showButton ? 'opacity-100' : 'opacity-0'}`}
      onClick={handlePlayPause}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
};

const PlayIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
