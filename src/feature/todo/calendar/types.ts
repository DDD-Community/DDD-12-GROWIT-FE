export type CalendarView = 'weekly' | 'monthly';

/**
 * 캘린더 메인 컴포넌트 Props
 */
export interface CalendarProps {
  // 상태
  selectedDate: Date;
  currentDate?: Date; // 표시할 주/월의 기준일 (기본값: new Date())
  defaultView?: CalendarView; // 기본 뷰 (기본값: 'weekly')

  // 데이터
  indicators?: Record<string, (string | null | undefined)[] | undefined>; // { '2025-01-01': ['#35D942', '#FF0000'] }
  holidays?: Record<string, string>; // { '2025-01-01': '새해' }

  // 이벤트 핸들러
  onDateSelect: (date: Date) => void;
  onViewChange?: (view: CalendarView) => void;
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;

  // 뷰 제어
  view?: CalendarView; // 외부에서 뷰 제어 (controlled)

  // 네비게이션
  showNavigation?: boolean; // 이전/다음 버튼 표시 (기본값: true)
}

/**
 * 주간 뷰 Props
 */
export interface WeekViewProps {
  selectedDate: Date;
  currentDate: Date;
  indicators?: Record<string, (string | null | undefined)[] | undefined>;
  holidays?: Record<string, string>;
  onDateSelect: (date: Date) => void;
  onWeekChange?: (direction: 'prev' | 'next') => void;
  showNavigation: boolean;
  selectedView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onTodayClick?: () => void;
}

/**
 * 월간 뷰 Props
 */
export interface MonthViewProps {
  selectedDate: Date;
  currentDate: Date;
  indicators?: Record<string, (string | null | undefined)[] | undefined>;
  holidays?: Record<string, string>;
  onDateSelect: (date: Date) => void;
  onMonthChange?: (direction: 'prev' | 'next') => void;
  showNavigation: boolean;
  selectedView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onTodayClick?: () => void;
}

/**
 * 날짜 셀 Props
 */
export interface DateCellProps {
  // 날짜 데이터
  date: Date;
  displayNumber: number;

  // 상태
  isSelected: boolean;
  isToday: boolean;
  isCurrentMonth: boolean; // 현재 월의 날짜인지

  // 표시 데이터
  indicatorColors?: (string | null | undefined)[];
  holidayLabel?: string;

  // 이벤트
  onClick: (date: Date) => void;

  // 스타일
  className?: string;
}

/**
 * 투두 인디케이터 Props
 */
export interface IndicatorProps {
  colors?: (string | null | undefined)[];
  maxDisplay?: number; // 기본값: 3
  className?: string;
}

/**
 * 뷰 전환 버튼 Props
 */
export interface ViewSwitcherProps {
  selectedView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  className?: string;
}

/**
 * 요일 헤더 Props
 */
export interface WeekdayHeaderProps {
  className?: string;
}

/**
 * 날짜 헤더 Props (주간 뷰용)
 */
export interface DateHeaderProps {
  date: Date;
  holidayLabel?: string;
  selectedView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onTodayClick?: () => void;
  className?: string;
}

/**
 * 월 헤더 Props
 */
export interface MonthHeaderProps {
  currentMonth: Date;
  onPrevious: () => void;
  onNext: () => void;
  selectedView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onTodayClick?: () => void;
  className?: string;
}

/**
 * 주 행 Props
 */
export interface WeekRowProps {
  dates: Date[];
  selectedDate: Date;
  currentMonth: Date;
  indicators?: Record<string, (string | null | undefined)[] | undefined>;
  holidays?: Record<string, string>;
  onDateSelect: (date: Date) => void;
}
