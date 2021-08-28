import puppeteer from 'puppeteer';

async function getDefaultPage(browser) {
    const currentPages = await browser.pages();
    const page = currentPages.length === 0 ? await browser.newPage() : currentPages[0];
    return page;
}

export async function launchBrowser() {
    const browser = await puppeteer.launch({ headless: false });
    const defaultPage = await getDefaultPage(browser);
    return defaultPage;
}

export async function closeBrowser(page) {
    await (await page.browser()).close();
}