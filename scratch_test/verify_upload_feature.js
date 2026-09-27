const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf-8');
console.log('index.html has btnUploadMonthlyExcelTab:', indexHtml.includes('btnUploadMonthlyExcelTab'));
console.log('index.html has snapshotMpStatusTitle:', indexHtml.includes('snapshotMpStatusTitle'));
console.log('index.html has monthlyExcelFileInput:', indexHtml.includes('monthlyExcelFileInput'));

const appJs = fs.readFileSync('app.js', 'utf-8');
console.log('app.js has renderSnapshotMpStatusCard:', appJs.includes('renderSnapshotMpStatusCard'));
console.log('app.js handles isMonthlyFilename in handleExcelFile:', appJs.includes('isMonthlyFilename'));
console.log('app.js saves js_monthly_performance_custom:', appJs.includes('js_monthly_performance_custom'));
