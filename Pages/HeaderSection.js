import BasePage from "./BasePage";

export default class HeaderSection extends BasePage {
    $admin = '#menu_admin_viewAdminModule';

    async clickOnAdminTab() {
      await this.page.click(this.$admin);
    }
  }
