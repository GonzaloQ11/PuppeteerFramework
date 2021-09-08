import BasePage from './BasePage';
import { log } from '../utils/integrations/allure';

export default class HeaderSection extends BasePage {
    $admin = '#menu_admin_viewAdminModule';

    @log
    async clickOnAdminTab() {
      await this.page.click(this.$admin);
      await this.waitForPageLoaded();
    }
}
