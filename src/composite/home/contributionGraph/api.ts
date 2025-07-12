import { http, HttpResponse } from 'msw';

export const getContribution = http.get('https://api.grow-it.me/mock/todos', () => {
  return HttpResponse.json({
    data: [
      'COMPLETED',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'NONE',
      'NONE',
      'COMPLETED',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'COMPLETED',
      'NONE',
      'NONE',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'NONE',
      'NONE',
      'COMPLETED',
      'NONE',
      'COMPLETED',
    ],
  });
});
