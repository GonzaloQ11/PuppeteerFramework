import { log } from '../utils/plugins/allure';

export default class BasePage {
    BASE_URL = 'https://opensource-demo.orangehrmlive.com/';

    constructor(page) {
      this.page = page;
    }

    async setPage(page) {
      this.page = page;
    }

    @log
    async navigate(url) {
      await this.page.goto(`${this.BASE_URL}${url}`);
    }

    async getElementProperty(selector, property) {
      return this.page.$eval(selector, (element, prop) => element[prop], property);
    }

    @log
    async getText(selector) {
      return this.getElementProperty(selector, 'textContent');
    }

    @log
    async getValue(selector) {
      return this.getElementProperty(selector, 'value');
    }

    @log
    async isDisplayed(selector, { timeout = 5000 } = { }) {
      try {
        await this.page.waitForSelector(selector, { timeout });
        return true;
      } catch (error) {
        return false;
      }
    }

    @log
    async waitForPageLoaded() {
      await this.page.waitForSelector('html[class="fontawesome-i2svg-active fontawesome-i2svg-complete"]');
    }

    @log
    async getElementsProperties(selector, property) {
      return this.page.$$eval(selector, (elements, prop) => elements.map((e) => e[prop]), property);
    }

    @log
    async selectByOptionText(dropdownSelector, option) {
      const optionTexts = await this.getElementsProperties(`${dropdownSelector} option`, 'textContent');
      const index = optionTexts.indexOf(option);
      const optionValues = await this.getElementsProperties(`${dropdownSelector} option`, 'value');
      await this.page.select(dropdownSelector, optionValues[index]);
    }
}
