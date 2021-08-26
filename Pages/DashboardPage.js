import BasePage from "./BasePage";

export default class DashboardPage extends BasePage {
    $dashboardBox = '.box';

    async isDashboardPageDisplayed() {
      return this.isDisplayed(this.$dashboardBox);
    }
  }
