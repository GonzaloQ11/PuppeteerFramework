import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import { launchBrowser, getPage, clearCookies } from '../utils/JestPuppeteerConfig';
import UsersPage from '../pages/UsersPage';
import testdata from '../utils/testdata';
import run from '../utils/integrations/index';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const usersPage = new UsersPage();
let browser;
let page;

describe('System Users tests', () => {
  beforeAll(async () => {
    browser = await launchBrowser();
  });

  beforeEach(async () => {
    page = await getPage(browser);
    await loginPage.setPage(page);
    await dashboardPage.setPage(page);
    await usersPage.setPage(page);
    await clearCookies(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('System Users page is displayed', run({
    testSteps: async () => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
      await loginPage.login(testdata.user.username, testdata.user.password);
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
      await dashboardPage.clickOnAdminTab();
      expect(await usersPage.isUsersPageDisplayed()).toBe(true);
    },
  }));

  test('User can search by username', run({
    testSteps: async () => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
      await loginPage.login(testdata.user.username, testdata.user.password);
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
      await dashboardPage.clickOnAdminTab();
      expect(await usersPage.isUsersPageDisplayed()).toBe(true);
      await usersPage.searchUserByUsername(testdata.roles.admin);
      expect(await usersPage.isResultsTableDisplayed()).toBe(true);
      const usernames = await usersPage.getTableUsernames();
      expect(usernames).toContain(testdata.roles.admin);
    },
  }));

  test('User can search by user role', run({
    testSteps: async () => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
      await loginPage.login(testdata.user.username, testdata.user.password);
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
      await dashboardPage.clickOnAdminTab();
      expect(await usersPage.isUsersPageDisplayed()).toBe(true);
      await usersPage.searchUserByUserRole(testdata.roles.ess);
      expect(await usersPage.isResultsTableDisplayed()).toBe(true);
      const userRoles = await usersPage.getTableUserRoles();
      expect(userRoles).toContain(testdata.roles.ess);
      expect(userRoles).not.toContain(testdata.roles.admin);
    },
  }));

  test('User can search by employee name', run({
    testSteps: async () => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
      await loginPage.login(testdata.user.username, testdata.user.password);
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
      await dashboardPage.clickOnAdminTab();
      expect(await usersPage.isUsersPageDisplayed()).toBe(true);
      let employeeNames = await usersPage.getTableEmployeeNames();
      await usersPage.searchUserByEmployeeName(employeeNames[0]);
      expect(await usersPage.isResultsTableDisplayed()).toBe(true);
      employeeNames = await usersPage.getTableEmployeeNames();
      expect(employeeNames).toContain(employeeNames[0]);
    },
  }));

  test('User can search by status', run({
    testSteps: async () => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
      await loginPage.login(testdata.user.username, testdata.user.password);
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
      await dashboardPage.clickOnAdminTab();
      expect(await usersPage.isUsersPageDisplayed()).toBe(true);
      await usersPage.searchUserByStatus(testdata.statuses.enabled);
      expect(await usersPage.isResultsTableDisplayed()).toBe(true);
      const employeeNames = await usersPage.getTableStatuses();
      expect(employeeNames).toContain(testdata.statuses.enabled);
      expect(employeeNames).not.toContain(testdata.statuses.disabled);
    },
  }));

  test('User can reset the search results', run({
    testSteps: async () => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
      await loginPage.login(testdata.user.username, testdata.user.password);
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
      await dashboardPage.clickOnAdminTab();
      expect(await usersPage.isUsersPageDisplayed()).toBe(true);
      await usersPage.searchUserByUsername(testdata.user.username);
      expect(await usersPage.isResultsTableDisplayed()).toBe(true);
      const usernames = await usersPage.getTableUsernames();
      expect(usernames).toContain(testdata.user.username);
      await usersPage.clickOnResetButton();
      await usersPage.waitForPageLoaded();
      const usernameInput = await usersPage.getUsernameInputValue();
      expect(usernameInput).toBe('');
    },
  }));
});
