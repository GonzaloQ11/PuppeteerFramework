/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

export default class ConsoleMessages {
  static startRegistryConsoleLog() {
    this.page = global.page;
    this.page.consoleMessages = [];
    this.page.on('console', (msg) => {
      this.page.consoleMessages.push(msg);
    });
    this.page.on('pageerror', (error) => {
      const consoleError = this.convertToConsoleError(error);
      this.page.consoleMessages.push(consoleError);
    });
  }

  static convertToConsoleError(error) {
    error._text = error.message;
    error._type = 'error';
    error._location = { url: '' };
    error.text = () => error.message;
    error.type = () => 'error';
    error.location = () => ({ url: '' });
    return error;
  }

  static resetConsoleMessages() {
    this.page.consoleMessages = [];
  }

  static getConsoleMessages({ types } = {}) {
    return this.page.consoleMessages.filter((msg) => (types ? types.includes(msg.type()) : true));
  }

  static getConsoleErrorMessages() {
    let errorMessages = this.getConsoleMessages({ types: ['error'] });
    this.resetConsoleMessages();
    return errorMessages;
  }

  static displayErrorMessages() {
    const consoleErrorMessages = this.getConsoleErrorMessages();
    if (consoleErrorMessages.length > 0) {
      console.warn(consoleErrorMessages);
    }
  }
}
