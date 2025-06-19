import { http, HttpResponse } from 'msw';

// 테스트용 더미 데이터
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'moderator' },
];

const getUsers = http.get('http://localhost:3000/api/users', () => {
  return HttpResponse.json(users, { status: 200 });
});

// 이 배열에 api 함수들을 넣어 작동
export const handlers = [getUsers];
