import { http, HttpResponse, delay } from 'msw';
import { AdviceChatRequest, AdviceChatResponse } from '@/model/advice/types';

// 조언 채팅 요청 핸들러
export const requestAdviceChat = http.post('/advice/chat', async ({ request }) => {
  // 2초 딜레이
  await delay(2000);

  const body = (await request.json()) as AdviceChatRequest;

  // 응답 스타일에 따른 메시지 예시
  const adviceMessages: Record<string, string> = {
    BASIC: '목표를 달성하기 위해서는 꾸준한 노력이 필요해요. 오늘 하루도 화이팅!',
    WARM: '정말 잘하고 계세요! 😊 당신의 노력이 분명히 좋은 결과로 이어질 거예요. 힘내세요!',
    FACTUAL: `${body.week}주차 목표를 분석한 결과, 계획된 작업을 단계적으로 진행하는 것이 효율적입니다.`,
    STRATEGIC:
      '목표 달성을 위해 우선순위를 정하고 작은 성취를 쌓아가는 전략을 추천드려요. 구체적인 실행 계획을 세워보세요.',
  };

  const grorongResponse = adviceMessages[body.adviceStyle] || '오늘도 목표를 향해 한 걸음 나아가세요!';

  const response: AdviceChatResponse = {
    data: {
      remainingCount: 5, // 남은 조언 횟수
      isGoalOnboardingCompleted: body.isGoalOnboardingCompleted ?? true,
      conversations: [
        {
          userMessage: body.userMessage,
          grorongResponse,
          timestamp: new Date().toISOString(),
        },
      ],
    },
  };

  return HttpResponse.json(response, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
});

// CORS preflight 요청 처리
export const optionsHandler = http.options('*', () => {
  return new HttpResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
});

// 모든 Advice 핸들러들을 배열로 export
export const adviceHandlers = [optionsHandler, requestAdviceChat];
