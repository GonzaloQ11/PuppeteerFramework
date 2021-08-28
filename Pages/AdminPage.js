import HeaderSection from "./HeaderSection";

export default class AdminPage extends HeaderSection {
    $searchForm = {
      box: '#systemUser-information',
      usernameInput: '#searchSystemUser_userName',
      userRoleSelect: "#searchSystemUser_userType",
      userRoleOption: (option) => `//*[@id='searchSystemUser_userType']//option[text()="${option}"]`,
      employeeNameInput: '#searchSystemUser_employeeName_empName',
      statusSelect: '#searchSystemUser_status',
      searchButton: '#searchBtn',
      resetButton: '#resetBtn',
    };
    $searchResults = {
      box: "#search-results",
      table: {
        id: "#resultTable",
        usernames: "#resultTable td [href*='user']",
        userRoles: "#resultTable td:nth-child(3)",
        employeeNames: "#resultTable td:nth-child(4)",
        status: "#resultTable td:nth-child(5)",
      },
    };

    async isAdminPageDisplayed() {
      return this.isDisplayed(this.$searchForm.box) && this.isDisplayed(this.$searchResults.box);
    }

    async typeUsername(username) {
      await this.page.type(this.$searchForm.usernameInput, username);
    }

    async selectUserRole(userRole) {
      await this.selectByOptionText(this.$searchForm.userRoleSelect, userRole);
    }

    async clickOnSearchButton() {
      await this.page.click(this.$searchForm.searchButton, { delay: 300 });
    }

    async clickOnResetButton() {
      await this.page.click(this.$searchForm.resetButton, { delay: 300 });
    }

    async searchUserByUsername(username) {
      await this.typeUsername(username);
      await this.clickOnSearchButton();
    }

    async searchUserByUserRole(userRole) {
      await this.selectUserRole(userRole);
      await this.clickOnSearchButton();
    }

    async typeEmployeeName(name) {
      await this.page.type(this.$searchForm.employeeNameInput, name, { delay: 50 });
      await this.page.keyboard.press("Enter")
    }

    async searchUserByEmployeeName(name) {
      await this.typeEmployeeName(name);
      await this.clickOnSearchButton();
    }

    async selectStatus(status) {
      await this.selectByOptionText(this.$searchForm.statusSelect, status);
    }

    async searchUserByStatus(userRole) {
      await this.selectStatus(userRole);
      await this.clickOnSearchButton();
    }

    async isResultsTableDisplayed() {
      return this.isDisplayed(this.$searchResults.table.id);
    }

    async getTableColumnSearchResults(columnSelector) {
      const columnSearchResults = await this.page.$$eval(columnSelector, (cells) => cells.map((cell) => cell.textContent));
      return columnSearchResults;
    }

    async getUsernameSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.usernames);
    }

    async getUserRolesSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.userRoles);
    }

    async getEmployeeNameSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.employeeNames);
    }

    async getStatusSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.status);
    }

    async getUsernameInputValue() {
      return this.getValue(this.$searchForm.usernameInput);
    }
  }
