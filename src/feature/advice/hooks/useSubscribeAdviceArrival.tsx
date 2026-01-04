import { AdviceChat, AdviceChatMessage } from '@/model/advice/types';
import { useEffect } from 'react';
import { DAILY_ADVICE_ARRIVAL } from '../customEvents';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { AdviceArrivalSheet } from '../components/AdviceArrivalSheet';

interface DailyAdviceCheckedStorage {
  isChecked: boolean;
  timestamp: string;
}

const IS_DAILY_ADVICE_CHECKED = 'isDailyAdviceChecked';

/** 아침 조언 도착 팝업 제공자, 커스텀 이벤트 구독 및 바텀시트 팝업 담당 */
export function AdviceArrivalPopupProvider({
  children,
  adviceChat,
}: {
  children: React.ReactNode;
  adviceChat: AdviceChat;
}) {
  const { isOpen, showSheet, closeSheet } = useBottomSheet();
  subscribeDailyAdviceArrival(adviceChat.conversations || []);

  useEffect(() => {
    const handleOpenAdviceArrivalSheet = () => {
      showSheet();
    };
    window.addEventListener(DAILY_ADVICE_ARRIVAL, handleOpenAdviceArrivalSheet);
    return () => {
      window.removeEventListener(DAILY_ADVICE_ARRIVAL, handleOpenAdviceArrivalSheet);
    };
  }, []);

  return (
    <>
      {children}
      <AdviceArrivalSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet} />
    </>
  );
}

export function subscribeDailyAdviceArrival(adviceChatMessages: AdviceChatMessage[]) {
  useEffect(() => {
    const dailyAdviceCheckedStorage = dailyAdviceStorage.get();
    if (!dailyAdviceCheckedStorage) return;

    const shouldDispatch = shouldDispatchDailyAdvice(
      adviceChatMessages,
      dailyAdviceCheckedStorage.isChecked,
      dailyAdviceCheckedStorage.timestamp
    );

    if (shouldDispatch && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(DAILY_ADVICE_ARRIVAL));
      // 이벤트 발행 후 체크 상태, 타임스탬프 초기화 (오늘 체크 완료)
      dailyAdviceStorage.set(true);
      return;
    }
    // 이벤트 발행해야할 상황이 아닌 경우, 체크 상태, 타임스탬프 false로 초기화
    dailyAdviceStorage.set(false);
  }, []);
}

function shouldDispatchDailyAdvice(
  messages = [] as AdviceChatMessage[],
  isChecked: boolean,
  lastCheckedAt: string
): boolean {
  if (messages.length === 0) return false;

  const lastMessage = messages.at(-1);
  const isSameDay = new Date(lastCheckedAt).toDateString() === new Date().toDateString();

  if (lastMessage && lastMessage.userMessage === '아침 조언 요청' && !isChecked && !isSameDay) {
    return true;
  }
  return false;
}

const dailyAdviceStorage = {
  get: (): DailyAdviceCheckedStorage | null => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(IS_DAILY_ADVICE_CHECKED);
      const now = new Date().toISOString();
      return raw
        ? JSON.parse(raw)
        : {
            isChecked: false,
            timestamp: now,
          };
    }
    return null;
  },
  set: (value: boolean) => {
    if (typeof window !== 'undefined') {
      const now = new Date().toISOString();
      localStorage.setItem(
        IS_DAILY_ADVICE_CHECKED,
        JSON.stringify({
          isChecked: value,
          lastCheckedAt: now,
        })
      );
    }
  },
};
