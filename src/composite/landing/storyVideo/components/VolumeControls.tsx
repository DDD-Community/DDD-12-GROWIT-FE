'use client';

import { useState } from 'react';
import { MuteButton } from './MuteButton';

interface VolumeControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isHovered: boolean;
}

export const VolumeControls = ({ videoRef, isHovered }: VolumeControlsProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);

  const showButton = isHovered || isMuted;

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <div
      className={`absolute bottom-4 right-4 flex items-center gap-2 transition-opacity duration-300 ${showButton ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="h-12 px-4 flex items-center rounded-full bg-black/50">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          aria-label="볼륨 조절"
          className="w-20 h-1 appearance-none bg-white/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
        />
      </div>
      <MuteButton isMuted={isMuted} onClick={handleToggleMute} />
    </div>
  );
};
