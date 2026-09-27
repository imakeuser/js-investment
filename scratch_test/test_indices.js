const http = require('http');

async function testIndex(symbol) {
  return new Promise((resolve) => {
    const targetUrl = `https://fchart.stock.naver.com/sise.nhn?symbol=${symbol}&timeframe=day&count=2000&requestType=0`;
    const proxyUrl = 'http://127.0.0.1:8080/api/proxy?url=' + encodeURIComponent(targetUrl);

    http.get(proxyUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = [...data.matchAll(/item data="(\d{8})\|(\d+(?:\.\d+)?)\|(\d+(?:\.\d+)?)\|(\d+(?:\.\d+)?)\|(\d+(?:\.\d+)?)/g)];
        if (matches.length > 0) {
          console.log(`[${symbol}] SUCCESS! Fetched ${matches.length} candles!`);
          console.log(`  Oldest: ${matches[0][1]} -> Close: ${matches[0][5]}`);
          console.log(`  Newest: ${matches[matches.length-1][1]} -> Close: ${matches[matches.length-1][5]}`);
          resolve(true);
        } else {
          console.log(`[${symbol}] No matches found.`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.error(`[${symbol}] Error:`, err.message);
      resolve(false);
    });
  });
}

(async () => {
  const symbols = ['KPI200', 'KOSPI', 'KOSDAQ', 'S&P500', 'SPX', 'INX', 'SPI@SPX', 'SP500', '360750', '371160', '360200'];
  for (const s of symbols) {
    await testIndex(s);
  }
})();
