import HeaderSection from "./HeaderSection";

export default class DashboardPage extends HeaderSection {
    $dashboardBox = '.box';

    async isDashboardPageDisplayed() {
      return this.isDisplayed(this.$dashboardBox);
    }
  }
