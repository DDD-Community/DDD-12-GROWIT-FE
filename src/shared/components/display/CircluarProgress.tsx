import { motion } from 'framer-motion';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  dayOfWeek: string;
  onClick?: () => void;
  isSelected?: boolean; // 선택 상태 추가
}

export const CircularProgress = ({
  progress,
  size = 40,
  strokeWidth = 4,
  dayOfWeek,
  onClick,
  isSelected = false,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative rounded-full cursor-pointer" onClick={onClick ? onClick : () => {}}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 선택된 상태의 배경 원 (SVG 내부) */}
        {isSelected && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius + strokeWidth / 2} // 전체 영역 채우기
            fill="white"
            initial={{ opacity: 0, r: radius * 0.8 }}
            animate={{ opacity: 1, r: radius + strokeWidth / 2 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        )}

        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="stroke-line-normal"
        />

        {/* 진행률 원 */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isSelected ? 'rgb(255, 255, 255)' : 'rgb(34, 197, 94)'} // 선택시 흰색, 기본은 초록색
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>

      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.span
          className={`text-sm font-bold transition-colors duration-200 ease-in-out ${
            isSelected ? 'text-black' : 'text-white'
          }`}
          transition={{ duration: 0.2 }}
        >
          {dayOfWeek}
        </motion.span>
      </div>
    </div>
  );
};
