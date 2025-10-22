/**
 * GTM 관련 커스텀 훅들
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gtmPageView, gtmCustomEvent, gtmSetUserProperties } from '../lib/gtm';
import { GTM_EVENTS, GTM_PARAMETERS } from '../constants/gtm-events';

/**
 * 페이지뷰 자동 추적 훅
 */
export const useGTMPageView = () => {
  const pathname = usePathname();

  useEffect(() => {
    // 페이지 변경 시 자동으로 페이지뷰 이벤트 전송
    gtmPageView(pathname);
  }, [pathname]);
};

/**
 * 사용자 속성 설정 훅
 */
export const useGTMUserProperties = (userId?: string, userProperties?: Record<string, any>) => {
  useEffect(() => {
    if (userId || userProperties) {
      gtmSetUserProperties({
        user_id: userId,
        ...userProperties,
      });
    }
  }, [userId, userProperties]);
};

/**
 * 커스텀 이벤트 전송 훅
 */
export const useGTMEvent = () => {
  const sendEvent = (eventName: string, parameters?: Record<string, any>) => {
    gtmCustomEvent(eventName, parameters);
  };

  return { sendEvent };
};

interface TrackButtonClickParams {
  eventName: GTM_EVENTS;
  buttonName: string;
  pagePath?: string; // 선택적으로 변경
}

/**
 * 특정 액션에 대한 이벤트 전송 훅들
 */
export const useGTMActions = () => {
  const { sendEvent } = useGTMEvent();
  const pathname = usePathname();

  const trackButtonClick = ({ eventName, buttonName, pagePath }: TrackButtonClickParams) => {
    sendEvent(eventName, {
      [GTM_PARAMETERS.BUTTON_NAME]: buttonName,
      [GTM_PARAMETERS.PAGE_PATH]: pagePath || pathname,
    });
  };

  return {
    trackButtonClick,
  };
};
