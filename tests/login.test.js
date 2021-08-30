import LoginPage from "../pages/LoginPage"
import DashboardPage from "../pages/DashboardPage"
import { launchBrowser, closeBrowser } from "../utils/JestPuppeteerConfig"
import { testdata } from "../utils/testdata";
import run from "../utils/plugins/integrations"

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
let page;

describe("Login Tests", () => {

    beforeEach(async () => {
        page = await launchBrowser();
        await loginPage.setPage(page);
        await dashboardPage.setPage(page);
    })

    afterEach(async () => {
        await closeBrowser(page);
    })

    test("Login page is displayed", run({
        feature: "feature test",
        story: "story test",
        epic: "epic test",
        issue: "issue test",
        description: "description test",
        testId: "testId test",
        tag: "tag test",
        testSteps: async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
    } }), 30000);

    test("User can login successfully", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login(testdata.user.username, testdata.user.password);
        expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
    }, 30000);

    test("Username cannot be empty", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.clickLoginButton()
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe(testdata.errorMessages.emptyUsername);
    }, 30000);

    test("Password cannot be empty", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.typeUsername(testdata.user.username);
        await loginPage.clickLoginButton()
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe(testdata.errorMessages.emptyPassword);
    }, 30000);

    test("Invalid credentials", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login(testdata.user.username, testdata.user.invalidPassword);
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe(testdata.errorMessages.invalidCredentials);
    }, 30000);

    test("User can login after a failed attempt", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login(testdata.user.username, testdata.user.invalidPassword);
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe(testdata.errorMessages.invalidCredentials);
        await loginPage.login(testdata.user.username, testdata.user.password);
        expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
    }, 30000);
})

