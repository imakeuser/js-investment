const puppeteer = require('./node_modules/puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', { timeout: 10000, waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    switchTab('tab-stock-analysis');
  });

  const layout = await page.evaluate(() => {
    const syncBtn = document.getElementById('btnSyncAndDraw');
    syncBtn.click();

    const chartWrapper = document.getElementById('saChartWrapper');
    const children = Array.from(chartWrapper.children).map(child => ({
      id: child.id,
      className: child.className
    }));

    const corrSection = document.querySelectorAll("#tab-stock-analysis > .table-card")[1];
    const corrDisplay = window.getComputedStyle(corrSection).display;

    return {
      chartWrapperChildrenOrder: children,
      corrSectionDisplay: corrDisplay
    };
  });

  console.log('LAYOUT VERIFICATION:', JSON.stringify(layout, null, 2));
  await browser.close();
})();
