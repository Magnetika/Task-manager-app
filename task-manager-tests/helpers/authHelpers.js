import { expect } from '@playwright/test';

const registerButtonName = 'Regisztráció';
const loginButtonName = 'Bejelentkezés';
const usernamePlaceholder = 'Felhasználónév';
const passwordPlaceholder = 'Jelszó';
const registrationSuccessMessage = 'Felhasználó sikeresen létrehozva';

function registerForm(page) {
  return page.locator(`form:has(button:has-text("${registerButtonName}"))`);
}

function loginForm(page) {
  return page.locator(`form:has(button:has-text("${loginButtonName}"))`);
}

async function fillCredentials(form, username, password) {
  await form.getByPlaceholder(usernamePlaceholder).fill(username);
  await form.getByPlaceholder(passwordPlaceholder).fill(password);
}

export function createUniqueUsername(suffix) {
  return `user_${Date.now()}_${suffix}`;
}

export async function registerUser({ page, baseURL, username, password }) {
  await page.goto(baseURL);

  const form = registerForm(page);
  await fillCredentials(form, username, password);
  await form.getByRole('button', { name: registerButtonName }).click();

  await expect(page.locator(`text=${registrationSuccessMessage}`)).toBeVisible();
}

export async function clearBrowserSession({ page, baseURL }) {
  await page.context().clearCookies();
  await page.goto(baseURL);
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

export async function loginUser({ page, baseURL, username, password }) {
  await page.goto(baseURL);

  const form = loginForm(page);
  await fillCredentials(form, username, password);
  await form.getByRole('button', { name: loginButtonName }).click();
}

export async function expectTodoListVisible(page) {
  await expect(page.getByRole('heading', { name: /todo lista/i })).toBeVisible({ timeout: 15000 });
}
