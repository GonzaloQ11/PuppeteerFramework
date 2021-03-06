import HeaderSection from './HeaderSection';
import { log } from '../utils/integrations/allure';

export default class UsersPage extends HeaderSection {
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
    async isUsersPageDisplayed() {
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
      await this.page.click(this.$searchForm.searchButton);
    }

    @log
    async clickOnResetButton() {
      await this.page.click(this.$searchForm.resetButton);
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
    async getTableColumnValues(columnSelector) {
      return this.getElementsProperties(columnSelector, 'textContent');
    }

    @log
    async getTableUsernames() {
      return this.getTableColumnValues(this.$searchResults.table.usernames);
    }

    @log
    async getTableUserRoles() {
      return this.getTableColumnValues(this.$searchResults.table.userRoles);
    }

    @log
    async getTableEmployeeNames() {
      return this.getTableColumnValues(this.$searchResults.table.employeeNames);
    }

    @log
    async getTableStatuses() {
      return this.getTableColumnValues(this.$searchResults.table.status);
    }

    @log
    async getUsernameInputValue() {
      return this.getValue(this.$searchForm.usernameInput);
    }
}
