import HeaderSection from './HeaderSection';
import { log } from '../utils/integrations/allure';

export default class DashboardPage extends HeaderSection {
    $dashboardBox = '.box';

    @log
    async isDashboardPageDisplayed() {
      return this.isDisplayed(this.$dashboardBox);
    }
}
