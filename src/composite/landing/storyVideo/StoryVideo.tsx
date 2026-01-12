'use client';

import { useRef, useState } from 'react';
import { PlayPauseButton } from './components/PlayPauseButton';
import { VolumeControls } from './components/VolumeControls';

export const StoryVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="relative w-full max-w-7xl animate-fade-in-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src="/landing/landing-story.mp4"
        width={1290}
        height={724}
        preload="metadata"
        playsInline
        muted
        className="aspect-video lg:block rounded-lg"
      />
      <PlayPauseButton videoRef={videoRef} isHovered={isHovered} />
      <VolumeControls videoRef={videoRef} isHovered={isHovered} />
    </article>
  );
};
