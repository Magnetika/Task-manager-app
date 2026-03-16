import { test, expect } from '@playwright/test';
import {
	clearBrowserSession,
	createUniqueUsername,
	expectTodoListVisible,
	loginUser,
	registerUser,
} from './helpers/authHelpers';

test.describe('Todo flow', () => {
	const baseURL = 'http://localhost:3000';
	const password = 'test123';

	test('Create and delete a todo item', async ({ page }) => {
		const username = createUniqueUsername('todo');
		const todoTitle = `Playwright todo ${Date.now()}`;
		const todoDescription = 'Created by automated e2e test';

		await registerUser({ page, baseURL, username, password });
		await clearBrowserSession({ page, baseURL });
		await loginUser({ page, baseURL, username, password });
		await expectTodoListVisible(page);

		await page.getByPlaceholder('Todo címe').fill(todoTitle);
		await page.getByPlaceholder('Leírás').fill(todoDescription);
		await page.getByRole('button', { name: 'Hozzáadás' }).click();

		const todoTitleHeading = page.getByRole('heading', { name: todoTitle });
		await expect(todoTitleHeading).toBeVisible();
		await expect(page.getByText(todoDescription)).toBeVisible();

		const todoCard = page.locator('div', { has: todoTitleHeading }).first();
		await todoCard.getByRole('button', { name: 'Törlés' }).click();

		await expect(todoTitleHeading).not.toBeVisible();
	});
});
