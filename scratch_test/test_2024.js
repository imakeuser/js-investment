const puppeteer = require('./node_modules/puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  await page.goto('http://127.0.0.1:8080/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Clicking Sync & Draw for 2024-01...');
  await page.evaluate(() => {
    switchTab('tab-stock-analysis');
    document.getElementById('saStartYearSelect').value = '2024';
    document.getElementById('saStartMonthSelect').value = '01';
    document.getElementById('btnSyncAndDraw').click();
  });

  await new Promise(r => setTimeout(r, 6000));

  const chartDates = await page.evaluate(() => {
    const canvas = document.getElementById('stockAnalysisChart');
    if (!canvas) return { error: 'Canvas not found' };
    const chart = Chart.getChart(canvas);
    if (!chart) return { error: 'Chart instance not found via Chart.getChart' };
    const labels = chart.data.labels;
    return {
      totalLabels: labels.length,
      firstLabel: labels[0],
      secondLabel: labels[1],
      lastLabel: labels[labels.length - 1]
    };
  });

  console.log('2024-01 CHART DATES RESULT:', JSON.stringify(chartDates, null, 2));
  await browser.close();
})();
