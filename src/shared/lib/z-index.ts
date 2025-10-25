/**
 * Z-Index 관리 - Tailwind CSS 클래스명
 *
 * 계층 구조 (높은 순서):
 * 1. Toast (가장 높음) - 사용자 알림
 * 2. Bottom Navigation - 하단 네비게이션
 * 3. Sheet/Modal - 시트, 모달 등 오버레이
 * 4. Dropdown/Popover - 드롭다운, 팝오버
 * 5. Header - 상단 헤더
 * 6. Content - 일반 콘텐츠
 */

export const Z_INDEX = {
  // 가장 높은 우선순위 - 사용자 알림
  TOAST: 'z-[9999]',
  POPUP: 'z-[9990]',
  SHEET: 'z-[990]',

  BOTTOM_NAVIGATION: 'z-[980]',
  MODAL: 'z-[980]',

  DROPDOWN: 'z-[970]',
  POPOVER: 'z-[970]',

  HEADER: 'z-[960]',

  CONTENT: 'z-[950]',

  BACKGROUND: 'z-[940]',
} as const;

export type ZIndexKey = keyof typeof Z_INDEX;
