import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MentorCharacterType } from './types';
import { mentorCharactersData } from './mentorCharactersData';

interface MentorCharacterCardProps {
  mentorCharacter: MentorCharacterType;
}

const MentorCharacterCard: React.FC<MentorCharacterCardProps> = ({ mentorCharacter }) => {
  const characterData = mentorCharactersData[mentorCharacter];
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="relative w-[280px] h-[420px] cursor-pointer"
      onClick={handleCardClick}
      whileTap={{ scale: 0.95 }}
    >
      {/* 글로우 이펙트 */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-600/20 blur-2xl" />

      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
      >
        {/* 카드 앞면 */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative h-full">
            {/* 배경 이미지 */}
            <img src={characterData.profileImage} alt="" className="absolute inset-0 w-full h-full object-cover" />

            {/* 그라디언트 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.8)]" />

            {/* 컨텐츠 */}
            <div className="relative h-full flex flex-col items-center justify-between p-6">
              <div className="text-white text-xs font-bold tracking-[2px] opacity-90 mt-2">GROWIT</div>

              <div className="flex flex-col items-center mb-8">
                <h3 className="text-white text-3xl font-bold mb-3">{characterData.name}</h3>
                <div className="bg-[#4CAF50] text-white px-5 py-2 rounded-full text-sm font-semibold">
                  {characterData.description}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 카드 뒷면 */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-gradient-to-b from-[#2E2E3E] to-[#1A1A24]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="px-8 py-10 h-full flex flex-col">
            {/* 헤더 영역 */}
            <div className="pb-6 mb-6 border-b border-[#3A3A4A]">
              <p className="text-white text-lg leading-relaxed font-bold whitespace-pre-line">
                {characterData.tagline}
              </p>
            </div>

            {/* 정보 영역 */}
            <div className="flex flex-col gap-4 mb-8">
              {characterData.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-[#9E9EA7] text-sm font-medium min-w-[35px]">{stat.label}</span>
                  <span className="text-white text-sm font-medium">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* 태그 영역 */}
            <div className="flex flex-wrap gap-2">
              {characterData.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-[#3A3A4A] text-[#B8B8C0] text-xs font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MentorCharacterCard;
