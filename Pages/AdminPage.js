import HeaderSection from "./HeaderSection";

export default class AdminPage extends HeaderSection {
    $searchForm = {
      box: '#systemUser-information',
      usernameInput: '#searchSystemUser_userName',
      userRoleSelect: "#searchSystemUser_userType",
      userRoleOption: (option) => `//*[@id='searchSystemUser_userType']//option[text()="${option}"]`,
      searchButton: '#searchBtn',
    };
    $searchResults = {
      box: "#search-results",
      table: {
        id: "#resultTable",
        usernames: "#resultTable td [href*='user']",
        userRoles: "#resultTable td:nth-child(3)"
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

    async searchUserByUsername(username) {
      await this.typeUsername(username);
      await this.clickOnSearchButton();
    }

    async searchUserByUserRole(userRole) {
      await this.selectUserRole(userRole);
      await this.clickOnSearchButton();
    }

    async isResultsTableDisplayed() {
      return this.isDisplayed(this.$searchResults.table.id);
    }

    async getTableColumnSearchResults(columnSelector) {
      const columnSearchResults = await this.page.$$eval(columnSelector, (cells) => cells.map((cell) => cell.outerText));
      return columnSearchResults;
    }

    async getUsernameSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.usernames);
    }

    async getUserRolesSearchResults() {
      return this.getTableColumnSearchResults(this.$searchResults.table.userRoles);
    }
  }
