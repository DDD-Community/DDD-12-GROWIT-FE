import { setupWorker } from 'msw/browser';
import { testUserHandlers } from './handlers/testUser.handlers';

export const worker = setupWorker(...testUserHandlers);
