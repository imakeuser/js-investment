const puppeteer = require('./node_modules/puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  const tabs = ['tab-overview', 'tab-accounts', 'tab-holdings', 'tab-stock-analysis', 'tab-snapshots'];
  for (const t of tabs) {
    const res = await page.evaluate((tabId) => {
      const btn = document.querySelector(`button[data-tab='${tabId}']`);
      btn.click();
      const content = document.getElementById(tabId);
      return {
        tabId,
        active: content.classList.contains('active'),
        display: window.getComputedStyle(content).display
      };
    }, t);
    console.log('TAB TEST:', JSON.stringify(res));
  }
  await browser.close();
})();
