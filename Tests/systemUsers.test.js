import LoginPage from "../Pages/LoginPage"
import DashboardPage from "../Pages/DashboardPage"
import { launchBrowser, closeBrowser } from "../Utils/JestPuppeteerConfig"
import AdminPage from "../Pages/AdminPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const adminPage = new AdminPage();
let page;

describe("System Users tests", () => {

    beforeEach(async () => {
        page = await launchBrowser();
        await loginPage.setPage(page);
        await dashboardPage.setPage(page);
        await adminPage.setPage(page);
    })

    afterEach(async () => {
        await closeBrowser(page);
    })

    test("System Users page is displayed", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login("Admin", "admin123")
        expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
        await dashboardPage.clickOnAdminTab();
        expect(await adminPage.isAdminPageDisplayed()).toBe(true);
    }, 30000)

    test("User can search by username", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login("Admin", "admin123")
        expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
        await dashboardPage.clickOnAdminTab();
        expect(await adminPage.isAdminPageDisplayed()).toBe(true);
        await adminPage.searchUserByUsername("Admin");
        expect(await adminPage.isResultsTableDisplayed()).toBe(true);
        const usernames = await adminPage.getUsernameSearchResults();
        expect(usernames).toContain("Admin");
    }, 30000)

    test("User can search by user role", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login("Admin", "admin123")
        expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
        await dashboardPage.clickOnAdminTab();
        expect(await adminPage.isAdminPageDisplayed()).toBe(true);
        await adminPage.searchUserByUserRole("ESS");
        expect(await adminPage.isResultsTableDisplayed()).toBe(true);
        const userRoles = await adminPage.getUserRolesSearchResults();
        expect(userRoles).toContain("ESS");
        expect(userRoles).not.toContain("Admin");
    }, 30000)
})

