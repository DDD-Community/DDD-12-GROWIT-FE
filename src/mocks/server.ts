import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/** 서버 컴포넌트(Node.js 레벨)에서 모킹을 위한 객체 */
export const server = setupServer(...handlers);

export const startMSWServer = async () => {
  return server.listen();
};
