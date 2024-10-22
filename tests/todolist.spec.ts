import { test, expect } from '@playwright/test';

import { LoginPage } from './pages/LoginPage';
import { TodoPage } from './pages/TodoPage';

let context;
let page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
});

test.beforeEach(async () => {
    page = await context.newPage();
    const homePage = new LoginPage(page);
    await homePage.login();
});

test.afterEach(async () => {
    await page.close();
});

test.afterAll(async () => {
    await context.close();
});

test('Add and verify task', async () => {
    const todoPage = new TodoPage(page);
    await todoPage.addTask('Task #1');
    await expect(page.getByText('Task #1')).toBeVisible();
});

test('Complete task', async () => {
    const todoPage = new TodoPage(page);
    await todoPage.addTask('Task #1');
    await todoPage.completeTask('Task #1');

    const taskLocator = page.locator('span:not(.item-body)').filter({ hasText: 'Task #1' });
    await expect(taskLocator).toHaveClass('inactive-item');
});

test('Clean all tasks', async () => {
    await page.waitForTimeout(1000);
    const todoPage = new TodoPage(page);
    await todoPage.addTask('Task #1');
    await todoPage.completeTask('Task #1');
    await todoPage.clearAllTasks();

    const inactiveTasks = page.locator('.inactive-item');
    await expect(inactiveTasks).toHaveCount(0);

    await todoPage.logout();
});
