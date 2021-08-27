export default class BasePage {
    BASE_URL = 'https://opensource-demo.orangehrmlive.com/';

    constructor(page) {
      this.page = page;
    }

    async setPage(page) {
      this.page = page;
    }

    async navigate(url) {
      await this.page.goto(`${this.BASE_URL}${url}`);
    }

    async getText(selector) {
      return this.page.evaluate((element) => $(element)[0].outerText, selector);
    }

    async isDisplayed(selector) {
      try {
        await this.page.waitForSelector(selector, { timeout : 5000 });
        return true;
      }
      catch (error) {
        return false;
      }
    }

    async waitForPageLoaded() {
      await this.page.waitForSelector("html.js-focus-visible", { hidden: true })
    }

    async clickByXpath(xpath) {
      await (await this.page.$x(xpath))[0].click();
    }

    async selectByOptionText(dropdownSelector, option) {
      const optionTexts = await this.page.$$eval(`${dropdownSelector} option`, (options) => options.map((option) => option.outerText));
      const index = optionTexts.indexOf(option);
      const optionValues = await this.page.$$eval(`${dropdownSelector} option`, (options) => options.map((option) => option.value));
      await this.page.select(dropdownSelector, optionValues[index]);
    }
  }
