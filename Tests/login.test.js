import LoginPage from "../Pages/LoginPage"
import DashboardPage from "../Pages/DashboardPage"
import { launchBrowser, closeBrowser } from "../Utils/JestPuppeteerConfig"

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

    it("Login page is displayed", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
    })

    it("User can login successfully", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login("Admin", "admin123")
        expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
    })

    it("Username cannot be empty", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.clickLoginButton()
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe("Username cannot be empty");
    })

    it("Password cannot be empty", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.typeUsername("Admin")
        await loginPage.clickLoginButton()
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe("Password cannot be empty");
    })

    it("Invalid credentials", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login("Admin", "admin")
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe("Invalid credentials");
    })

    it("User can login after a failed attempt", async () => {
        await loginPage.go()
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login("Admin", "admin")
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe("Invalid credentials");
        await loginPage.login("Admin", "admin123")
        expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
    }, 30000);
})

