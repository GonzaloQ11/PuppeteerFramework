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
  }
  