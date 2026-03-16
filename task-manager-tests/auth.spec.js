import { test } from '@playwright/test';
import {
  clearBrowserSession,
  createUniqueUsername,
  expectTodoListVisible,
  loginUser,
  registerUser,
} from './helpers/authHelpers';

test.describe('Auth flow', () => {
  const baseURL = 'http://localhost:3000';
  const password = 'test123';

  test('Register a new user', async ({ page }) => {
    const username = createUniqueUsername('reg');
    await registerUser({ page, baseURL, username, password });
  });

  test('Login with existing user', async ({ page }) => {
    const username = createUniqueUsername('login');

    await registerUser({ page, baseURL, username, password });
    await clearBrowserSession({ page, baseURL });
    await loginUser({ page, baseURL, username, password });

    await expectTodoListVisible(page);
  });
});