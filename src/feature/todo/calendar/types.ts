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
  indicators?: Record<string, number>; // { '2025-01-01': 3 }
  holidays?: Record<string, string>; // { '2025-01-01': '새해' }

  // 이벤트 핸들러
  onDateSelect: (date: Date) => void;
  onViewChange?: (view: CalendarView) => void;
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;

  // 뷰 제어
  view?: CalendarView; // 외부에서 뷰 제어 (controlled)
  showViewSwitcher?: boolean; // 뷰 전환 버튼 표시 여부 (기본값: true)

  // 네비게이션
  showNavigation?: boolean; // 이전/다음 버튼 표시 (기본값: true)
  showTodayButton?: boolean; // 오늘 버튼 표시 (기본값: false)

  // 스타일 커스터마이징
  className?: string;
  styles?: {
    container?: string;
    header?: string;
    viewSwitcher?: string;
    weekView?: string;
    monthView?: string;
  };
}

/**
 * 주간 뷰 Props
 */
export interface WeekViewProps {
  selectedDate: Date;
  currentDate: Date;
  indicators?: Record<string, number>;
  holidays?: Record<string, string>;
  onDateSelect: (date: Date) => void;
  onWeekChange?: (direction: 'prev' | 'next') => void;
  showNavigation: boolean;
  selectedView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  className?: string;
}

/**
 * 월간 뷰 Props
 */
export interface MonthViewProps {
  selectedDate: Date;
  currentDate: Date;
  indicators?: Record<string, number>;
  holidays?: Record<string, string>;
  onDateSelect: (date: Date) => void;
  onMonthChange?: (direction: 'prev' | 'next') => void;
  showNavigation: boolean;
  selectedView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  className?: string;
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
  indicatorCount?: number; // 0-3
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
  count: number; // 1-3
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
  className?: string;
}

/**
 * 주 행 Props
 */
export interface WeekRowProps {
  dates: Date[];
  selectedDate: Date;
  currentMonth: Date;
  indicators?: Record<string, number>;
  holidays?: Record<string, string>;
  onDateSelect: (date: Date) => void;
  className?: string;
}
