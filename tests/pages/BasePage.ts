import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickElement(locator: string | Locator): Promise<void> {
    if (typeof locator === 'string') {
      await this.page.click(locator);
    } else {
      await locator.click();
    }
  }

  async fillInput(locator: string | Locator, text: string, delay: number = 100): Promise<void> {
    if (typeof locator === 'string') {
      await this.page.click(locator);
      await this.page.keyboard.type(text, { delay });
    } else {
      await locator.click();
      await this.page.keyboard.type(text, { delay });
    }
  }


  async isVisible(locator: string | Locator): Promise<boolean> {
    if (typeof locator === 'string') {
      return this.page.isVisible(locator);
    } else {
      return locator.isVisible();
    }
  }

  async waitForSelector(locator: string | Locator): Promise<void> {
    if (typeof locator === 'string') {
      await this.page.waitForSelector(locator);
    } else {
      await locator.waitFor();
    }
  }
}