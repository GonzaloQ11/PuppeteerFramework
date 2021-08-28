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

    async getElementProperty(selector, property) {
      return this.page.$eval(selector, (element, property) => element[property], property);
    }

    async getText(selector) {
      return this.getElementProperty(selector, "textContent");
    }

    async getValue(selector) {
      return this.getElementProperty(selector, "value");
    }

    async isDisplayed(selector, { timeout = 5000 } = { }) {
      try {
        await this.page.waitForSelector(selector, { timeout });
        return true;
      }
      catch (error) {
        return false;
      }
    }

    async waitForPageLoaded() {
      await this.page.waitForSelector("html[class='fontawesome-i2svg-active fontawesome-i2svg-complete']");
    }

    async clickByXpath(xpath) {
      await (await this.page.$x(xpath))[0].click();
    }

    async getElementsProperties(selector, property) {
      return this.page.$$eval(selector, (elements, property) => elements.map((element) => element[property]), property);
    }

    async selectByOptionText(dropdownSelector, option) {
      const optionTexts = await this.getElementsProperties(`${dropdownSelector} option`, "textContent");
      const index = optionTexts.indexOf(option);
      const optionValues = await this.getElementsProperties(`${dropdownSelector} option`, "value");
      await this.page.select(dropdownSelector, optionValues[index]);
    }
  }
