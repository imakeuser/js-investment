const http = require('http');

async function testNaverMobileIndex() {
  return new Promise((resolve) => {
    const targetUrl = 'https://m.stock.naver.com/api/index/SPI@SPX/price?pageSize=500&page=1';
    const proxyUrl = 'http://127.0.0.1:8080/api/proxy?url=' + encodeURIComponent(targetUrl);

    http.get(proxyUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log('Mobile Index API SUCCESS! Received items count:', json.length);
          if (json.length > 0) {
            console.log('First item:', json[0]);
            console.log('Last item:', json[json.length - 1]);
          }
          resolve(true);
        } catch(e) {
          console.log('Parse error:', e.message, data.substring(0, 100));
          resolve(false);
        }
      });
    }).on('error', err => console.error(err));
  });
}

testNaverMobileIndex();
