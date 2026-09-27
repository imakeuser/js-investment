const fs = require('fs');

// Test if index.html contains tab-monthly-performance
const indexHtml = fs.readFileSync('index.html', 'utf-8');
console.log('index.html contains tab-monthly-performance:', indexHtml.includes('tab-monthly-performance'));
console.log('index.html contains mpAssetTrendChart:', indexHtml.includes('mpAssetTrendChart'));
console.log('index.html contains mpPnlComboChart:', indexHtml.includes('mpPnlComboChart'));

// Test if app.js contains renderMonthlyPerformanceTab
const appJs = fs.readFileSync('app.js', 'utf-8');
console.log('app.js contains renderMonthlyPerformanceTab:', appJs.includes('renderMonthlyPerformanceTab'));
console.log('app.js contains PRELOADED_MONTHLY_PERFORMANCE:', appJs.includes('PRELOADED_MONTHLY_PERFORMANCE'));
console.log('app.js contains loadMonthlyPerformanceData:', appJs.includes('loadMonthlyPerformanceData'));

// Test if xlsx file exists
console.log('spop_db/월별투자성과현황_2609.xlsx exists:', fs.existsSync('spop_db/월별투자성과현황_2609.xlsx'));
