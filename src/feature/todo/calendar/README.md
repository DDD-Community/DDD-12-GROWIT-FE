## 📋 Props

### CalendarProps

| Prop                | Type                     | Default      | Description           |
| ------------------- | ------------------------ | ------------ | --------------------- |
| `selectedDate`      | `Date`                   | **required** | 선택된 날짜           |
| `currentDate`       | `Date`                   | `new Date()` | 표시할 주/월의 기준일 |
| `defaultView`       | `'weekly' \| 'monthly'`  | `'weekly'`   | 기본 뷰               |
| `view`              | `'weekly' \| 'monthly'`  | -            | 뷰 제어 (controlled)  |
| `indicators`        | `Record<string, number>` | `{}`         | 날짜별 투두 개수      |
| `holidays`          | `Record<string, string>` | `{}`         | 공휴일/기념일 라벨    |
| `onDateSelect`      | `(date: Date) => void`   | **required** | 날짜 선택 콜백        |
| `onViewChange`      | `(view) => void`         | -            | 뷰 변경 콜백          |
| `onDateRangeChange` | `(start, end) => void`   | -            | 날짜 범위 변경 콜백   |
| `showViewSwitcher`  | `boolean`                | `true`       | 뷰 전환 버튼 표시     |
| `showNavigation`    | `boolean`                | `true`       | 이전/다음 버튼 표시   |
| `className`         | `string`                 | `''`         | 커스텀 클래스         |
| `styles`            | `object`                 | `{}`         | 스타일 객체           |


## 사용예시

### 기본사용
```tsx
import { Calendar } from '@/feature/todo/calendar';
import { useState } from 'react';

export const TodoPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 투두 인디케이터 데이터
  const indicators = {
    '2025-01-01': 3,
    '2025-01-03': 2,
    '2025-01-05': 1,
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
<Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} defaultView="weekly" showViewSwitcher={false} />
```