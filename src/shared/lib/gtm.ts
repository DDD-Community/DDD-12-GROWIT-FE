/**
 * Google Tag Manager 관련 유틸리티 함수들
 */

import { GTM_EVENTS } from '../constants/gtm-events';

// GTM 이벤트 타입 정의
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

// GTM 데이터 레이어 타입 정의
export interface GTMDataLayer {
  event: string;
  page_title?: string;
  page_location?: string;
  user_id?: string;
  [key: string]: any;
}

// GTM 이벤트 전송 함수
export const gtmEvent = (eventData: GTMEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData);
  }
};

// 페이지뷰 이벤트 전송
export const gtmPageView = (pagePath: string, pageTitle?: string) => {
  gtmEvent({
    event: GTM_EVENTS.PAGE_VIEW,
    page_path: pagePath,
    page_title: pageTitle || document.title,
    page_location: window.location.href,
  });
};

// 사용자 정의 이벤트 전송
export const gtmCustomEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  gtmEvent({
    event: eventName,
    ...parameters,
  });
};

// 전환 이벤트 전송
export const gtmConversion = (conversionId: string, value?: number, currency?: string) => {
  gtmEvent({
    event: GTM_EVENTS.CONVERSION,
    conversion_id: conversionId,
    value: value,
    currency: currency || 'KRW',
  });
};

// 사용자 속성 설정
export const gtmSetUserProperties = (properties: Record<string, any>) => {
  gtmEvent({
    event: 'user_properties',
    ...properties,
  });
};

// dataLayer 타입 확장 (기존 선언이 있는 경우를 고려)
interface Window {
  dataLayer?: any[];
}
