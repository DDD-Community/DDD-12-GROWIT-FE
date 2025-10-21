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

/**
 * 특정 액션에 대한 이벤트 전송 훅들
 */
export const useGTMActions = () => {
  const { sendEvent } = useGTMEvent();

  const trackButtonClick = (buttonName: string, location?: string) => {
    sendEvent(GTM_EVENTS.BUTTON_CLICK, {
      [GTM_PARAMETERS.BUTTON_NAME]: buttonName,
      [GTM_PARAMETERS.BUTTON_LOCATION]: location,
    });
  };

  const trackFormSubmit = (formName: string, success: boolean = true) => {
    sendEvent(GTM_EVENTS.FORM_SUBMIT, {
      [GTM_PARAMETERS.FORM_NAME]: formName,
      [GTM_PARAMETERS.FORM_SUCCESS]: success,
    });
  };

  const trackGoalComplete = (goalId: string, goalName: string, value?: number) => {
    sendEvent(GTM_EVENTS.GOAL_COMPLETE, {
      [GTM_PARAMETERS.GOAL_ID]: goalId,
      [GTM_PARAMETERS.GOAL_NAME]: goalName,
      [GTM_PARAMETERS.GOAL_VALUE]: value,
    });
  };

  const trackTodoAction = (action: 'create' | 'complete' | 'delete' | 'update', todoId?: string) => {
    const eventMap = {
      create: GTM_EVENTS.TODO_CREATE,
      complete: GTM_EVENTS.TODO_COMPLETE,
      delete: GTM_EVENTS.TODO_DELETE,
      update: GTM_EVENTS.TODO_UPDATE,
    };

    sendEvent(eventMap[action], {
      [GTM_PARAMETERS.TODO_ID]: todoId,
    });
  };

  const trackNavigation = (from: string, to: string) => {
    sendEvent(GTM_EVENTS.NAVIGATION, {
      [GTM_PARAMETERS.NAVIGATION_FROM]: from,
      [GTM_PARAMETERS.NAVIGATION_TO]: to,
    });
  };

  return {
    trackButtonClick,
    trackFormSubmit,
    trackGoalComplete,
    trackTodoAction,
    trackNavigation,
  };
};
