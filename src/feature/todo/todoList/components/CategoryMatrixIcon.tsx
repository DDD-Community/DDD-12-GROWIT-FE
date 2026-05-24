import { CSSProperties } from 'react';

export type MatrixCategory = 'URGENT' | 'CONSISTENT' | 'DEFERABLE' | 'DELETABLE';

const CATEGORY_COLOR: Record<MatrixCategory, string> = {
  URGENT: '#FF6467',
  CONSISTENT: '#FFB900',
  DEFERABLE: '#51A2FF',
  DELETABLE: '#ABAB9C',
};

const INACTIVE_COLOR = '#404040';

const QUADRANT_ORDER: MatrixCategory[] = ['URGENT', 'CONSISTENT', 'DEFERABLE', 'DELETABLE'];

interface CategoryMatrixIconProps {
  /** 활성 카테고리 — 해당 사분면만 카테고리 색상 */
  category: MatrixCategory;
  /** 전체 아이콘 픽셀 크기. 기본 24 (Figma 197:3404 Ic/matrix_*) */
  size?: number;
  className?: string;
}

/**
 * 카테고리 매트릭스 아이콘 (Figma 197:3404 Ic/matrix_*).
 *
 * 외곽 프레임 size×size 의 가운데 50% 영역(inset-1/4)에 2×2 사분면을 그린다.
 * 활성 카테고리 셀만 카테고리 색상, 나머지는 #404040.
 * 사분면 순서: 좌상 URGENT → 우상 CONSISTENT → 좌하 DEFERABLE → 우하 DELETABLE.
 */
export const CategoryMatrixIcon = ({
  category,
  size = 24,
  className,
}: CategoryMatrixIconProps) => {
  const inset = size / 4;
  const innerSize = size - inset * 2;
  const gap = Math.max(1, Math.round(innerSize / 6));

  const containerStyle: CSSProperties = {
    width: size,
    height: size,
  };

  const matrixStyle: CSSProperties = {
    top: inset,
    left: inset,
    width: innerSize,
    height: innerSize,
    gap,
  };

  return (
    <div
      className={`relative shrink-0 ${className ?? ''}`}
      style={containerStyle}
      aria-label={`category-${category}`}
    >
      <div className="absolute grid grid-cols-2" style={matrixStyle}>
        {QUADRANT_ORDER.map(cell => (
          <span
            key={cell}
            className="rounded-[1px]"
            style={{
              backgroundColor:
                cell === category ? CATEGORY_COLOR[cell] : INACTIVE_COLOR,
            }}
          />
        ))}
      </div>
    </div>
  );
};
