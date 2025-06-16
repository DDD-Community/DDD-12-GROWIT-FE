import { http, HttpResponse } from 'msw';

// 임시 태스트를 해보기 위한 코드 작성
export const testUserHandlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];
