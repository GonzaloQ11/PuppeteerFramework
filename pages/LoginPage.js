import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
    $usernameInput = '#txtUsername';
    $passwordInput = '#txtPassword';
    $loginButton = '#btnLogin';
    $errorMessageContainer = '#spanMessage';

    async go() {
      await this.navigate('/');
    }

    async isLoginPageDisplayed() {
      return this.isDisplayed(this.$loginButton) && this.isDisplayed(this.$usernameInput) && this.isDisplayed(this.$passwordInput)
    }

    async login(username, password) {
      await this.typeUsername(username);
      await this.typePassword(password);
      await this.clickLoginButton();
    }

    async typeUsername(username) {
      await this.page.type(this.$usernameInput, username);
    }

    async typePassword(password) {
      await this.page.type(this.$passwordInput, password);
    }

    async clickLoginButton() {
      await this.page.click(this.$loginButton);
    }

    async isErrorMessageDisplayed() {
      return this.isDisplayed(this.$errorMessageContainer);
    }

    async getErrorMessage() {
      return this.getText(this.$errorMessageContainer);
    }
  }
