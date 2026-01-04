'use client';

import { PageHeader } from '@/shared/components/layout/PageHeader';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AdviceQuery } from '@/model/advice/queries';
import { AdviceChatMessage } from '@/model/advice/types';
import { useMemo } from 'react';

export const AdviceHistoryClient = () => {
  const { data: adviceChat } = useSuspenseQuery(AdviceQuery.getAdviceChat());

  // 주차별로 그룹핑
  const groupedByWeek = useMemo(() => {
    if (!adviceChat?.conversations || adviceChat.conversations.length === 0) {
      return [];
    }

    const groups = new Map<string, AdviceChatMessage[]>();

    adviceChat.conversations.forEach(message => {
      const weekKey = getWeekKey(message.timestamp);
      if (!groups.has(weekKey)) {
        groups.set(weekKey, []);
      }
      groups.get(weekKey)!.push(message);
    });

    // 주차별로 정렬 (최신순)
    return Array.from(groups.entries())
      .map(([weekKey, messages]) => ({
        weekKey,
        weekLabel: formatWeekLabel(weekKey),
        messages: messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      }))
      .sort((a, b) => b.weekKey.localeCompare(a.weekKey));
  }, [adviceChat?.conversations]);

  return (
    <>
      <PageHeader title="히스토리" />
      <main className="flex flex-col h-full p-5 gap-y-5 max-w-md w-full mx-auto">
        {groupedByWeek.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="body-1-normal text-text-tertiary">히스토리가 없습니다.</p>
          </div>
        ) : (
          groupedByWeek.map(group => (
            <div key={group.weekKey} className="flex flex-col gap-y-2">
              <p className="label-1-medium text-text-primary">{group.weekLabel}</p>
              <ul className="flex flex-col gap-y-2 label-1-normal text-text-primary">
                {group.messages.map((message, index) => (
                  <AdviceHistoryItem key={`${message.timestamp}-${index}`} message={message} />
                ))}
              </ul>
            </div>
          ))
        )}
      </main>
    </>
  );
};

type AdviceHistoryItemProps = {
  message: AdviceChatMessage;
};

function AdviceHistoryItem({ message }: AdviceHistoryItemProps) {
  return <li className="bg-fill-normal rounded-lg py-4 px-5 truncate">{message.grorongResponse}</li>;
}

/**
 * timestamp를 기준으로 주차 키를 생성합니다.
 * 형식: "YYYY-MM-WW" (년-월-주차)
 * 주차는 해당 월의 첫 번째 날짜를 기준으로 계산합니다.
 */
function getWeekKey(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // 해당 월의 첫 번째 날짜
  const firstDayOfMonth = new Date(year, month - 1, 1);
  // 첫 번째 날짜가 속한 주의 월요일 찾기
  const firstMonday = getMondayOfWeek(firstDayOfMonth);

  // 현재 날짜가 속한 주의 월요일 찾기
  const currentMonday = getMondayOfWeek(date);

  // 첫 번째 월요일부터 현재 월요일까지의 주차 계산
  const diffDays = Math.floor((currentMonday.getTime() - firstMonday.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.floor(diffDays / 7) + 1;

  return `${year}-${String(month).padStart(2, '0')}-${String(weekNumber).padStart(2, '0')}`;
}

/**
 * 주어진 날짜가 속한 주의 월요일을 반환합니다.
 * 월요일을 주의 시작일로 간주합니다.
 */
function getMondayOfWeek(date: Date): Date {
  const dayOfWeek = date.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 월요일까지의 일수

  const monday = new Date(date);
  monday.setDate(date.getDate() - daysToMonday);
  monday.setHours(0, 0, 0, 0);

  return monday;
}

/**
 * 주차 키를 한국어 형식으로 변환합니다.
 * 예: "2025-12-01" -> "2025년 12월 1주차"
 */
function formatWeekLabel(weekKey: string): string {
  const [year, month, week] = weekKey.split('-');
  return `${year}년 ${parseInt(month)}월 ${parseInt(week)}주차`;
}
