import { delay, http, HttpResponse } from 'msw';

const data = [
  {
    id: 'nDAjMpb_h0CIZJLwYXUJL',
    userId: '3J5BJTA9rG5fd3XLpsde7',
    name: '내 목표는 그로잇 완성',
    duration: {
      startDate: '2025-06-23',
      endDate: '2025-07-20',
    },
    beforeAfter: {
      asIs: '기획 정의',
      toBe: '배포 완료',
    },
    plans: [
      {
        id: 'GN9Rd8w4JfJckPQ4iPEU3',
        content: '기획 및 설계 회의',
        weekOfMonth: 1,
      },
      {
        id: 'iU5RyTeghn015wz6Ar61Q',
        content: '디자인 시안 뽑기',
        weekOfMonth: 2,
      },
      {
        id: 'JkI_btg_1N8xmhb79JnbY',
        content: '프론트 개발 및 백 개발 완료',
        weekOfMonth: 3,
      },
      {
        id: 'jJKHY0aJQTIFJ26TIBLmb',
        content: '배포 완료',
        weekOfMonth: 4,
      },
    ],
  },
];

export const getGoals = http.get('https://api.grow-it.me/mock/goals', async () => {
  await delay(800);
  return HttpResponse.json({ data }, { status: 200 });
});
