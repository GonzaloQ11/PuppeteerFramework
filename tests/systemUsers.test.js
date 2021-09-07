import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import { launchBrowser, getPage, clearCookies } from '../utils/JestPuppeteerConfig';
import AdminPage from '../pages/AdminPage';
import testdata from '../utils/testdata';
import run from '../utils/integrations/index';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const adminPage = new AdminPage();
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
    await adminPage.setPage(page);
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
      expect(await adminPage.isAdminPageDisplayed()).toBe(true);
    },
  }));

  test('User can search by username', run({
    testSteps: async () => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
      await loginPage.login(testdata.user.username, testdata.user.password);
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
      await dashboardPage.clickOnAdminTab();
      expect(await adminPage.isAdminPageDisplayed()).toBe(true);
      await adminPage.searchUserByUsername(testdata.roles.admin);
      expect(await adminPage.isResultsTableDisplayed()).toBe(true);
      const usernames = await adminPage.getUsernameSearchResults();
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
      expect(await adminPage.isAdminPageDisplayed()).toBe(true);
      await adminPage.searchUserByUserRole(testdata.roles.ess);
      expect(await adminPage.isResultsTableDisplayed()).toBe(true);
      const userRoles = await adminPage.getUserRolesSearchResults();
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
      expect(await adminPage.isAdminPageDisplayed()).toBe(true);
      await adminPage.searchUserByEmployeeName(testdata.user.employeeName);
      expect(await adminPage.isResultsTableDisplayed()).toBe(true);
      const employeeNames = await adminPage.getEmployeeNameSearchResults();
      expect(employeeNames).toContain(testdata.user.employeeName);
    },
  }));

  test('User can search by status', run({
    testSteps: async () => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
      await loginPage.login(testdata.user.username, testdata.user.password);
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
      await dashboardPage.clickOnAdminTab();
      expect(await adminPage.isAdminPageDisplayed()).toBe(true);
      await adminPage.searchUserByStatus(testdata.statuses.enabled);
      expect(await adminPage.isResultsTableDisplayed()).toBe(true);
      const employeeNames = await adminPage.getStatusSearchResults();
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
      expect(await adminPage.isAdminPageDisplayed()).toBe(true);
      await adminPage.searchUserByUsername(testdata.user.username);
      expect(await adminPage.isResultsTableDisplayed()).toBe(true);
      const usernames = await adminPage.getUsernameSearchResults();
      expect(usernames).toContain(testdata.user.username);
      await adminPage.clickOnResetButton();
      await adminPage.waitForPageLoaded();
      const usernameInput = await adminPage.getUsernameInputValue();
      expect(usernameInput).toBe('');
    },
  }));
});
