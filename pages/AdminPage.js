import HeaderSection from './HeaderSection';
import { log } from '../utils/plugins/allure';

export default class AdminPage extends HeaderSection {
    $searchForm = {
      box: '#systemUser-information',
      usernameInput: '#searchSystemUser_userName',
      userRoleSelect: '#searchSystemUser_userType',
      employeeNameInput: '#searchSystemUser_employeeName_empName',
      statusSelect: '#searchSystemUser_status',
      searchButton: '#searchBtn',
      resetButton: '#resetBtn',
    };

    $searchResults = {
      box: '#search-results',
      table: {
        id: '#resultTable',
        usernames: '#resultTable td [href*=user]',
        userRoles: '#resultTable td:nth-child(3)',
        employeeNames: '#resultTable td:nth-child(4)',
        status: '#resultTable td:nth-child(5)',
      },
    };

    @log
    async isAdminPageDisplayed() {
      return this.isDisplayed(this.$searchForm.box) && this.isDisplayed(this.$searchResults.box);
    }

    @log
    async typeUsername(username) {
      await this.page.type(this.$searchForm.usernameInput, username);
    }

    @log
    async selectUserRole(userRole) {
      await this.selectByOptionText(this.$searchForm.userRoleSelect, userRole);
    }

    @log
    async clickOnSearchButton() {
      await this.page.click(this.$searchForm.searchButton, { delay: 300 });
    }

    @log
    async clickOnResetButton() {
      await this.page.click(this.$searchForm.resetButton, { delay: 300 });
    }

    @log
    async searchUserByUsername(username) {
      await this.typeUsername(username);
      await this.clickOnSearchButton();
    }

    @log
    async searchUserByUserRole(userRole) {
      await this.selectUserRole(userRole);
      await this.clickOnSearchButton();
    }

    @log
    async typeEmployeeName(name) {
      await this.page.type(this.$searchForm.employeeNameInput, name, { delay: 50 });
      await this.page.keyboard.press('Enter');
    }

    @log
    async searchUserByEmployeeName(name) {
      await this.typeEmployeeName(name);
      await this.clickOnSearchButton();
    }

    @log
    async selectStatus(status) {
      await this.selectByOptionText(this.$searchForm.statusSelect, status);
    }

    @log
    async searchUserByStatus(userRole) {
      await this.selectStatus(userRole);
      await this.clickOnSearchButton();
    }

    @log
    async isResultsTableDisplayed() {
      return this.isDisplayed(this.$searchResults.table.id);
    }

    @log
    async getTableColumnSearchResults(columnSelector) {
      return this.getElementsProperties(columnSelector, 'textContent');
    }

    @log
    async getUsernameSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.usernames);
    }

    @log
    async getUserRolesSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.userRoles);
    }

    @log
    async getEmployeeNameSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.employeeNames);
    }

    @log
    async getStatusSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.status);
    }

    @log
    async getUsernameInputValue() {
      return this.getValue(this.$searchForm.usernameInput);
    }
}
