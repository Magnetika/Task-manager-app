import { test, expect } from '@playwright/test';

test.describe('Auth flow', () => {
  const baseURL = 'http://localhost:3000';
  const password = 'test123';

  test('Register a new user', async ({ page }) => {
    const username = `user_${Date.now()}_reg`;

    await page.goto(baseURL);

    const registerForm = page.locator('form:has(button:has-text("Regisztráció"))');
    await registerForm.getByPlaceholder('Felhasználónév').fill(username);
    await registerForm.getByPlaceholder('Jelszó').fill(password);
    await registerForm.getByRole('button', { name: 'Regisztráció' }).click();

    await expect(page.locator('text=Felhasználó sikeresen létrehozva')).toBeVisible();
  });

  test('Login with existing user', async ({ page }) => {
    const username = `user_${Date.now()}_login`;

    // 1) Create user
    await page.goto(baseURL);

    const registerForm = page.locator('form:has(button:has-text("Regisztráció"))');
    await registerForm.getByPlaceholder('Felhasználónév').fill(username);
    await registerForm.getByPlaceholder('Jelszó').fill(password);
    await registerForm.getByRole('button', { name: 'Regisztráció' }).click();

    await expect(page.locator('text=Felhasználó sikeresen létrehozva')).toBeVisible();

    // 2) Clear session + login
    await page.context().clearCookies();
    await page.goto(baseURL);
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();

    const loginForm = page.locator('form:has(button:has-text("Bejelentkezés"))');
    await loginForm.getByPlaceholder('Felhasználónév').fill(username);
    await loginForm.getByPlaceholder('Jelszó').fill(password);
    await loginForm.getByRole('button', { name: 'Bejelentkezés' }).click();

    await expect(page.getByRole('heading', { name: /todo lista/i })).toBeVisible({ timeout: 15000 });
  });
});