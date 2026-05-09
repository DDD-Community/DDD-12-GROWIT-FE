import { CSSProperties } from 'react';

export type MatrixCategory = 'NOW' | 'STEADY' | 'SKIP' | 'DELETE';

const CATEGORY_COLOR: Record<MatrixCategory, string> = {
  NOW: '#FF6467',
  STEADY: '#FFB900',
  SKIP: '#51A2FF',
  DELETE: '#ABAB9C',
};

const INACTIVE_COLOR = '#404040';

const QUADRANT_ORDER: MatrixCategory[] = ['NOW', 'STEADY', 'SKIP', 'DELETE'];

interface CategoryMatrixIconProps {
  /** 활성 카테고리 — 해당 사분면만 카테고리 색상 */
  category: MatrixCategory;
  /** 전체 아이콘 픽셀 크기. 기본 16 (Figma 197:3262~3265) */
  size?: number;
  /** 사분면 사이 gap. 기본 2 */
  gap?: number;
  className?: string;
}

/**
 * 카테고리 매트릭스 아이콘 (Figma 197:3262 Ic/matrix_*).
 *
 * 2×2 사분면 중 활성 카테고리의 셀만 색칠하고 나머지는 #404040.
 * 사분면 순서: 좌상 NOW → 우상 STEADY → 좌하 SKIP → 우하 DELETE.
 */
export const CategoryMatrixIcon = ({
  category,
  size = 16,
  gap = 2,
  className,
}: CategoryMatrixIconProps) => {
  const containerStyle: CSSProperties = {
    width: size,
    height: size,
    gap,
  };

  return (
    <div
      className={`grid grid-cols-2 shrink-0 ${className ?? ''}`}
      style={containerStyle}
      aria-label={`category-${category}`}
    >
      {QUADRANT_ORDER.map(cell => (
        <span
          key={cell}
          className="rounded-[2px]"
          style={{
            backgroundColor:
              cell === category ? CATEGORY_COLOR[cell] : INACTIVE_COLOR,
          }}
        />
      ))}
    </div>
  );
};
