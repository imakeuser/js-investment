const http = require('http');

const targetUrl = 'https://fchart.stock.naver.com/sise.nhn?symbol=005930&timeframe=day&count=2000&requestType=0';
const proxyUrl = 'http://127.0.0.1:8080/api/proxy?url=' + encodeURIComponent(targetUrl);

http.get(proxyUrl, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = [...data.matchAll(/item data="(\d{8})/g)].map(m => m[1]);
    console.log(`SUCCESS! Fetched ${matches.length} daily candles from Naver FChart.`);
    if (matches.length > 0) {
      console.log(`Oldest Date: ${matches[0].slice(0,4)}-${matches[0].slice(4,6)}-${matches[0].slice(6,8)}`);
      console.log(`Newest Date: ${matches[matches.length-1].slice(0,4)}-${matches[matches.length-1].slice(4,6)}-${matches[matches.length-1].slice(6,8)}`);
    }
  });
}).on('error', (err) => console.error('Fetch error:', err));
