const puppeteer = require('./node_modules/puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER EXCEPTION:', err.stack || err.message));

  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Testing click on tab-snapshots...');
  const result = await page.evaluate(() => {
    const btn = document.querySelector("button[data-tab='tab-snapshots']");
    if (!btn) return { error: 'Button not found' };
    
    const onclickAttr = btn.getAttribute('onclick');
    btn.click();

    const tabSnapshotsContent = document.getElementById('tab-snapshots');
    const isTabActive = tabSnapshotsContent?.classList.contains('active');
    const displayStyle = tabSnapshotsContent ? window.getComputedStyle(tabSnapshotsContent).display : 'null';
    
    return {
      btnFound: true,
      onclickAttr,
      isTabActive,
      displayStyle,
      tableRows: document.querySelectorAll('#snapshotsHistoryTableBody tr').length
    };
  });

  console.log('CLICK RESULT:', JSON.stringify(result, null, 2));
  await browser.close();
})();
