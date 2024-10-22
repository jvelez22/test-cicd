import { BasePage } from './BasePage';

export class TodoPage extends BasePage {

  constructor(page) {
    super(page);
  }

  async addTask(taskName: string): Promise<void> {
    await this.page.getByPlaceholder('What needs to be done?').click();
    await this.page.waitForTimeout(1000);
    await this.page.getByPlaceholder('What needs to be done?').fill(taskName);
    await this.page.waitForTimeout(1000);
    await this.page.getByPlaceholder('What needs to be done?').press('Enter');
  }

  async clearAllTasks(): Promise<void> {
    await this.page.getByText('clear_allClear').click();
    await this.page.waitForTimeout(1000);
  }

  async completeTask(taskName: string): Promise<void> {
    const taskLocator = this.page.locator('span').filter({ hasText: `check_box_outline_blank ${taskName}` }).locator('i');
    await taskLocator.click();
    await this.page.waitForTimeout(1000);
  }

  async logout(): Promise<void> {
    await this.page.locator('a').filter({ hasText: 'power_settings_new' }).click();
    await this.page.waitForTimeout(1000);
  }
}
