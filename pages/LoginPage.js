import BasePage from "./BasePage";
import { log } from "../utils/plugins/allure"
export default class LoginPage extends BasePage {
    $usernameInput = '#txtUsername';
    $passwordInput = '#txtPassword';
    $loginButton = '#btnLogin';
    $errorMessageContainer = '#spanMessage';

    @log
    async go() {
      await this.navigate('/');
    }

    @log
    async isLoginPageDisplayed() {
      return this.isDisplayed(this.$loginButton) && this.isDisplayed(this.$usernameInput) && this.isDisplayed(this.$passwordInput)
    }

    @log
    async login(username, password) {
      await this.typeUsername(username);
      await this.typePassword(password);
      await this.clickLoginButton();
    }

    @log
    async typeUsername(username) {
      await this.page.type(this.$usernameInput, username);
    }

    @log
    async typePassword(password) {
      await this.page.type(this.$passwordInput, password);
    }

    @log
    async clickLoginButton() {
      await this.page.click(this.$loginButton);
    }

    @log
    async isErrorMessageDisplayed() {
      return this.isDisplayed(this.$errorMessageContainer);
    }

    @log
    async getErrorMessage() {
      return this.getText(this.$errorMessageContainer);
    }
  }
