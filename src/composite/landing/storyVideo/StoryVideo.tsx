'use client';

import { useRef, useState } from 'react';

export const StoryVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
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

  return (
    <article className="relative w-full max-w-7xl animate-fade-in-up">
      <video
        ref={videoRef}
        src="/landing/landing-story.mp4"
        width={1290}
        height={724}
        poster="/landing/landing-story-thumbnail.png"
        preload="metadata"
        playsInline
        className="aspect-video lg:block rounded-lg"
      />
      <button
        aria-label="영상 재생"
        className="w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        onClick={handlePlayPause}
      />
    </article>
  );
};
