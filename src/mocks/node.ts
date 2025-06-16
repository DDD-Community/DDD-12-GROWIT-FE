import { setupServer } from 'msw/node';
import { testUserHandlers } from './handlers/testUser.handlers';

export const server = setupServer(...testUserHandlers);
