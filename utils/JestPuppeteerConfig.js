import puppeteer from 'puppeteer';

async function getDefaultPage(browser) {
  const currentPages = await browser.pages();
  const page = currentPages.length === 0 ? await browser.newPage() : currentPages[0];
  return page;
}

export async function launchBrowser() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: process.env.HEADLESS === 'true',
  });
  return browser;
}

export async function getPage(browser) {
  const defaultPage = await getDefaultPage(browser);
  global.page = defaultPage;
  return defaultPage;
}

export async function closeBrowser(page) {
  await (await page.browser()).close();
}

export async function clearCookies(page) {
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCookies');
  await client.send('Network.clearBrowserCache');
}
