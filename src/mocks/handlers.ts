import { http, HttpResponse } from 'msw';
import { todoHandlers } from './domain/todo';
import { getGoals } from '@/composite/home/goalRoadMap/api';
import { getContribution } from '@/composite/home/contributionGraph/api';

// 테스트용 더미 데이터
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'moderator' },
];

// 테스트용 사용자 계정
const testUsers = [
  { email: 'test@example.com', password: '123456' },
  { email: 'admin@example.com', password: 'admin123' },
];

const getUsers = http.get('http://localhost:3000/api/users', () => {
  return HttpResponse.json(users, { status: 200 });
});

const login = http.post('http://localhost:3000/api/login', async ({ request }) => {
  const body = (await request.json()) as { email: string; password: string };
  const { email, password } = body;

  // 테스트용 로그인 로직
  const user = testUsers.find(u => u.email === email && u.password === password);

  if (user) {
    return HttpResponse.json(
      {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      },
      { status: 200 }
    );
  } else {
    return HttpResponse.json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' }, { status: 404 });
  }
});

const reissue = http.post('http://localhost:3000/api/reissue', async ({ request }) => {
  const body = (await request.json()) as { refreshToken: string };
  const { refreshToken } = body;

  if (refreshToken && refreshToken.startsWith('mock-refresh-token-')) {
    return HttpResponse.json(
      {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      },
      { status: 200 }
    );
  } else {
    return HttpResponse.json({ message: '유효하지 않은 토큰입니다.' }, { status: 401 });
  }
});

const getJobRoles = http.get('/resource/jobroles', () => {
  return HttpResponse.json(
    {
      data: {
        jobRoles: [
          { id: 'jobId1', name: '디자이너' },
          { id: 'jobId2', name: '기획자' },
          { id: 'jobId3', name: '개발자' },
        ],
      },
    },
    { status: 200 }
  );
});

// 이 배열에 api 함수들을 넣어 작동
export const handlers = [getUsers, login, reissue, getJobRoles, getGoals, getContribution, ...todoHandlers];
