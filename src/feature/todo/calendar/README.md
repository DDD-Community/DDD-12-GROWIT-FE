## 📋 Props

### CalendarProps

| Prop                | Type                       | Default      | Description                            |
| ------------------- | -------------------------- | ------------ | -------------------------------------- |
| `selectedDate`      | `Date`                     | **required** | 선택된 날짜                            |
| `currentDate`       | `Date`                     | `new Date()` | 표시할 주/월의 기준일                  |
| `defaultView`       | `'weekly' \| 'monthly'`    | `'weekly'`   | 기본 뷰                                |
| `view`              | `'weekly' \| 'monthly'`    | -            | 뷰 제어 (controlled)                   |
| `indicators`        | `Record<string, string[]>` | `{}`         | 날짜별 인디케이터 색상 배열 (최대 3개) |
| `holidays`          | `Record<string, string>`   | `{}`         | 공휴일/기념일 라벨                     |
| `onDateSelect`      | `(date: Date) => void`     | **required** | 날짜 선택 콜백                         |
| `onViewChange`      | `(view) => void`           | -            | 뷰 변경 콜백                           |
| `onDateRangeChange` | `(start, end) => void`     | -            | 날짜 범위 변경 콜백                    |
| `showNavigation`    | `boolean`                  | `true`       | 이전/다음 버튼 표시                    |

## 사용예시

### 기본사용

```tsx
import { Calendar } from '@/feature/todo/calendar';
import { useState } from 'react';

export const TodoPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 투두 인디케이터 데이터
  const indicators = {
    '2025-01-01': ['#35D942', '#FFD95C', '#FF6363'],
    '2025-01-03': ['#35D942', '#35D942'],
    '2025-01-05': [null], // null/빈 문자열은 기본 초록색으로 렌더링
  };

  // 공휴일 데이터
  const holidays = {
    '2025-01-01': '새해',
  };

  return (
    <div>
      <Calendar
        selectedDate={selectedDate}
        indicators={indicators}
        holidays={holidays}
        onDateSelect={setSelectedDate}
      />

      {/* 선택된 날짜의 투두 리스트 표시 */}
      <TodoListByDate date={selectedDate} />
    </div>
  );
};
```

### 날짜 선택

```tsx
import { Calendar, CalendarView } from '@/feature/todo/calendar';
import { useState } from 'react';

export const TodoPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('weekly');

  return <Calendar selectedDate={selectedDate} view={view} onViewChange={setView} onDateSelect={setSelectedDate} />;
};
```

### Default View 모드

```tsx
<Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} defaultView="weekly" />
```
