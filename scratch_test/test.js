const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });

  console.log("Navigating to http://localhost:8080/");
  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });

  console.log("Waiting a bit...");
  await new Promise(r => setTimeout(r, 2000));

  console.log("Switching to '주가분석' tab...");
  await page.evaluate(() => {
    if (typeof switchTab === 'function') {
      switchTab('tab-stock-analysis');
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log("Triggering handleSyncAndDraw()...");
  await page.evaluate(() => {
    if (typeof handleSyncAndDraw === 'function') {
      handleSyncAndDraw();
    } else {
      document.getElementById('btnSyncAndDraw').click();
    }
  });

  console.log("Waiting 3 seconds for data and chart...");
  await new Promise(r => setTimeout(r, 3000));

  console.log("Capturing screenshot...");
  await page.screenshot({ path: 'chart_screenshot.png' });

  console.log("Evaluating chart instance...");
  const result = await page.evaluate(() => {
    try {
      if (!window.stockAnalysisChartInstance) {
        return { error: "No chart instance found." };
      }
      
      const chart = window.stockAnalysisChartInstance;
      const labels = chart.data.labels;
      const datasets = chart.data.datasets;
      const canvas = document.getElementById('stockAnalysisChart');
      
      let res = {
        labelsLength: labels.length,
        firstLabel: labels[0],
        lastLabel: labels[labels.length - 1],
        datasetsCount: datasets.length,
        canvasWidth: canvas.offsetWidth,
        canvasHeight: canvas.offsetHeight,
        dataset0_Name: datasets[0]?.label,
        dataset0_DataSample: datasets[0]?.data.slice(0, 5),
        datasetDummy_Name: datasets[datasets.length - 1]?.label,
        datasetDummy_DataSample: datasets[datasets.length - 1]?.data.slice(0, 5)
      };
      
      return res;
    } catch(e) {
      return { error: e.message };
    }
  });

  console.log("EVALUATION RESULT:");
  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();
