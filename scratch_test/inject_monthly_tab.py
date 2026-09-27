import json

# Read monthly_performance.json
with open('scratch_test/monthly_performance.json', 'r', encoding='utf-8') as f:
    perf_data = json.load(f)

perf_json_str = json.dumps(perf_data, ensure_ascii=False)

# Read current app.js
with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Let's inspect where switchTab is in app.js
target_switch_tab = "    } else if (tabId === 'tab-accounts') {"
replacement_switch_tab = """    } else if (tabId === 'tab-monthly-performance') {
      renderMonthlyPerformanceTab();
    } else if (tabId === 'tab-accounts') {"""

if target_switch_tab in app_js:
    app_js = app_js.replace(target_switch_tab, replacement_switch_tab, 1)
    print("Successfully replaced switchTab target!")
else:
    print("WARNING: target_switch_tab not found!")

# Let's inspect where setupEvents is called or DOMContentLoaded
target_setup = "    setupEvents();"
replacement_setup = """    setupEvents();
    setupMpEvents();
    loadMonthlyPerformanceData();"""

if target_setup in app_js:
    app_js = app_js.replace(target_setup, replacement_setup, 1)
    print("Successfully replaced setupEvents target!")
else:
    print("WARNING: target_setup not found!")

mp_code_block = f"""
  // ==========================================
  // TAB: Monthly Investment Performance (월별 투자성과 현황)
  // ==========================================
  const PRELOADED_MONTHLY_PERFORMANCE = {perf_json_str};

  let rawMonthlyData = PRELOADED_MONTHLY_PERFORMANCE;
  let mpSelectedPeriod = 'ALL';
  let mpSelectedYear = 'ALL';
  let mpSearchQuery = '';
  let mpSortBy = 'date-desc';
  let mpAssetChartInstance = null;
  let mpPnlChartInstance = null;

  async function loadMonthlyPerformanceData() {{
    try {{
      const res = await fetch('/spop_db/월별투자성과현황_2609.xlsx');
      if (res.ok) {{
        const buf = await res.arrayBuffer();
        const parsed = parseMonthlyPerformanceArrayBuffer(buf);
        if (parsed && parsed.length > 0) {{
          rawMonthlyData = parsed;
          if (activeTabId === 'tab-monthly-performance') renderMonthlyPerformanceTab();
          return;
        }}
      }}
    }} catch (e) {{
      console.warn('Fetched monthly performance excel failed, falling back to preloaded data:', e);
    }}
    rawMonthlyData = PRELOADED_MONTHLY_PERFORMANCE;
    if (activeTabId === 'tab-monthly-performance') renderMonthlyPerformanceTab();
  }}

  function parseMonthlyPerformanceArrayBuffer(arrayBuffer) {{
    if (!window.XLSX) return null;
    try {{
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, {{ type: 'array' }});
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, {{ header: 1 }});
      
      const parsed = [];
      for (let i = 0; i < rows.length; i++) {{
        const r = rows[i];
        if (!r || r.length < 2) continue;
        
        let dateStr = '';
        const cellA = r[0];
        if (typeof cellA === 'number' && cellA > 40000 && cellA < 50000) {{
          const jsDate = new Date((cellA - (25567 + 2)) * 86400 * 1000);
          const y = jsDate.getFullYear();
          const m = String(jsDate.getMonth() + 1).padStart(2, '0');
          dateStr = `${{y}}-${{m}}`;
        }} else if (cellA !== undefined && cellA !== null) {{
          const s = String(cellA).trim();
          if (s.match(/^\\d{{4}}[\\.\\-\\/]?\\d{{2}}/)) {{
            dateStr = s.replace(/[\\.\\/]/g, '-').substring(0, 7);
          }}
        }}
        
        if (!dateStr || !dateStr.match(/^\\d{{4}}-\\d{{2}}$/)) continue;
        
        const baseEval = parseFloat(r[1]) || 0;
        const endEval = parseFloat(r[2]) || 0;
        const profitLoss = parseFloat(r[3]) || 0;
        const adjEval = parseFloat(r[4]) || 0;
        const returnRate = parseFloat(r[5]) || 0;
        const deposit = parseFloat(r[6]) || 0;
        const withdrawal = parseFloat(r[7]) || 0;
        const stockIn = parseFloat(r[8]) || 0;
        const stockOut = parseFloat(r[9]) || 0;
        
        parsed.push({{
          date: dateStr,
          base_eval: baseEval,
          end_eval: endEval,
          profit_loss: profitLoss,
          adj_eval: adjEval,
          return_rate: returnRate,
          deposit: deposit,
          withdrawal: withdrawal,
          stock_in: stockIn,
          stock_out: stockOut
        }});
      }}
      
      parsed.sort((a, b) => a.date.localeCompare(b.date));
      
      let cumProfit = 0;
      let cumDeposit = 0;
      parsed.forEach(item => {{
        cumProfit += item.profit_loss;
        cumDeposit += (item.deposit - item.withdrawal + item.stock_in - item.stock_out);
        item.cum_profit = cumProfit;
        item.cum_deposit = cumDeposit;
      }});
      
      return parsed;
    }} catch(err) {{
      console.error('Failed parsing monthly excel:', err);
      return null;
    }}
  }}

  function getFilteredMonthlyData() {{
    let data = [...rawMonthlyData];
    
    if (mpSelectedYear !== 'ALL') {{
      data = data.filter(d => d.date.startsWith(mpSelectedYear));
    }} else if (mpSelectedPeriod === '1Y') {{
      data = data.slice(-12);
    }} else if (mpSelectedPeriod === '3Y') {{
      data = data.slice(-36);
    }} else if (mpSelectedPeriod === '5Y') {{
      data = data.slice(-60);
    }}
    
    return data;
  }}

  function renderMonthlyPerformanceTab() {{
    if (!rawMonthlyData || rawMonthlyData.length === 0) return;

    const latest = rawMonthlyData[rawMonthlyData.length - 1];
    const prev = rawMonthlyData.length > 1 ? rawMonthlyData[rawMonthlyData.length - 2] : null;

    // 1. KPI Cards
    const curEvalEl = document.getElementById('mpKpiCurrentEval');
    if (curEvalEl) curEvalEl.textContent = formatKRW(latest.end_eval);

    const evalTrendEl = document.getElementById('mpKpiEvalTrend');
    if (evalTrendEl && prev) {{
      const diff = latest.end_eval - prev.end_eval;
      const diffPct = prev.end_eval > 0 ? (diff / prev.end_eval * 100) : 0;
      const isUp = diff >= 0;
      evalTrendEl.className = `badge-trend ${{isUp ? 'up' : 'down'}}`;
      evalTrendEl.innerHTML = `<i data-lucide="${{isUp ? 'trending-up' : 'trending-down'}}"></i> 전월 대비 ${{isUp ? '+' : ''}}${{formatKRW(diff)}} (${{isUp ? '+' : ''}}${{diffPct.toFixed(2)}}%)`;
    }}

    const cumProfitEl = document.getElementById('mpKpiCumProfit');
    if (cumProfitEl) {{
      const isUp = latest.cum_profit >= 0;
      cumProfitEl.textContent = `${{isUp ? '+' : ''}}${{formatKRW(latest.cum_profit)}}`;
      cumProfitEl.style.color = isUp ? 'var(--profit-green)' : 'var(--loss-red)';
    }}

    const profitBadgeEl = document.getElementById('mpKpiProfitBadge');
    if (profitBadgeEl) {{
      const netCap = latest.cum_deposit;
      const overallReturn = netCap > 0 ? (latest.cum_profit / netCap * 100) : 0;
      const isUp = latest.cum_profit >= 0;
      profitBadgeEl.className = `badge-trend ${{isUp ? 'up' : 'down'}}`;
      profitBadgeEl.textContent = `누적 수익률 ${{isUp ? '+' : ''}}${{overallReturn.toFixed(2)}}%`;
    }}

    const netCapEl = document.getElementById('mpKpiNetCapital');
    if (netCapEl) netCapEl.textContent = formatKRW(latest.cum_deposit);

    // Find Best & Worst Months
    let bestM = rawMonthlyData[0];
    let worstM = rawMonthlyData[0];
    rawMonthlyData.forEach(d => {{
      if (d.profit_loss > bestM.profit_loss) bestM = d;
      if (d.profit_loss < worstM.profit_loss) worstM = d;
    }});

    const bestEl = document.getElementById('mpKpiBestMonth');
    if (bestEl) bestEl.textContent = `최고: ${{bestM.date}} (+${{formatKRW(bestM.profit_loss)}})`;
    const worstEl = document.getElementById('mpKpiWorstMonth');
    if (worstEl) worstEl.textContent = `최저: ${{worstM.date}} (${{formatKRW(worstM.profit_loss)}})`;

    // 2. Summary Text
    const filteredData = getFilteredMonthlyData();
    const summaryTextEl = document.getElementById('mpPeriodSummaryText');
    if (summaryTextEl && filteredData.length > 0) {{
      summaryTextEl.textContent = `조회 범위: ${{filteredData[0].date}} ~ ${{filteredData[filteredData.length - 1].date}} (${{filteredData.length}}개월)`;
    }}

    // 3. Render Charts
    renderMpAssetChart(filteredData);
    renderMpPnlChart(filteredData);

    // 4. Render Tables
    renderMpYearlyTable();
    renderMpDetailTable();

    if (window.lucide) window.lucide.createIcons();
  }}

  function renderMpAssetChart(data) {{
    const ctx = document.getElementById('mpAssetTrendChart');
    if (!ctx) return;

    if (mpAssetChartInstance) {{
      mpAssetChartInstance.destroy();
      mpAssetChartInstance = null;
    }}

    const labels = data.map(d => d.date);
    const evalData = data.map(d => d.end_eval);
    const depositData = data.map(d => d.cum_deposit);
    const profitData = data.map(d => d.cum_profit);

    mpAssetChartInstance = new Chart(ctx, {{
      type: 'line',
      data: {{
        labels: labels,
        datasets: [
          {{
            label: '기말 평가금액 (원)',
            data: evalData,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.25,
            pointRadius: data.length > 50 ? 0 : 3,
            pointHoverRadius: 5
          }},
          {{
            label: '누적 순투입 원금 (원)',
            data: depositData,
            borderColor: '#f59e0b',
            borderWidth: 2,
            borderDash: [4, 4],
            fill: false,
            tension: 0.1,
            pointRadius: 0
          }},
          {{
            label: '누적 투자손익 (원)',
            data: profitData,
            borderColor: '#10b981',
            borderWidth: 2,
            fill: false,
            tension: 0.2,
            pointRadius: 0
          }}
        ]
      }},
      options: {{
        responsive: true,
        maintainAspectRatio: false,
        interaction: {{ mode: 'index', intersect: false }},
        plugins: {{
          legend: {{ labels: {{ color: '#9ca3af', font: {{ family: 'Outfit' }} }} }},
          tooltip: {{
            callbacks: {{
              label: function(context) {{
                return `${{context.dataset.label}}: ${{formatKRW(context.parsed.y)}}`;
              }}
            }}
          }}
        }},
        scales: {{
          x: {{ ticks: {{ color: '#9ca3af', font: {{ size: 11 }} }}, grid: {{ color: 'rgba(255, 255, 255, 0.05)' }} }},
          y: {{
            ticks: {{
              color: '#9ca3af',
              callback: function(v) {{ return (v / 100000000).toFixed(1) + '억원'; }}
            }},
            grid: {{ color: 'rgba(255, 255, 255, 0.05)' }}
          }}
        }}
      }}
    }});
  }}

  function renderMpPnlChart(data) {{
    const ctx = document.getElementById('mpPnlComboChart');
    if (!ctx) return;

    if (mpPnlChartInstance) {{
      mpPnlChartInstance.destroy();
      mpPnlChartInstance = null;
    }}

    const labels = data.map(d => d.date);
    const pnlData = data.map(d => d.profit_loss);
    const returnData = data.map(d => d.return_rate);
    const barColors = data.map(d => d.profit_loss >= 0 ? 'rgba(16, 185, 129, 0.85)' : 'rgba(244, 63, 94, 0.85)');

    mpPnlChartInstance = new Chart(ctx, {{
      type: 'bar',
      data: {{
        labels: labels,
        datasets: [
          {{
            type: 'bar',
            label: '월별 투자손익 (원)',
            data: pnlData,
            backgroundColor: barColors,
            borderRadius: 3,
            yAxisID: 'y'
          }},
          {{
            type: 'line',
            label: '월간 수익률 (%)',
            data: returnData,
            borderColor: '#06b6d4',
            borderWidth: 1.8,
            pointRadius: data.length > 50 ? 0 : 2,
            yAxisID: 'y1'
          }}
        ]
      }},
      options: {{
        responsive: true,
        maintainAspectRatio: false,
        interaction: {{ mode: 'index', intersect: false }},
        plugins: {{
          legend: {{ labels: {{ color: '#9ca3af', font: {{ family: 'Outfit' }} }} }},
          tooltip: {{
            callbacks: {{
              label: function(context) {{
                if (context.dataset.yAxisID === 'y1') {{
                  return `월간 수익률: ${{context.parsed.y > 0 ? '+' : ''}}${{context.parsed.y.toFixed(2)}}%`;
                }}
                return `월별 손익: ${{context.parsed.y > 0 ? '+' : ''}}${{formatKRW(context.parsed.y)}}`;
              }}
            }}
          }}
        }},
        scales: {{
          x: {{ ticks: {{ color: '#9ca3af', font: {{ size: 11 }} }}, grid: {{ color: 'rgba(255, 255, 255, 0.05)' }} }},
          y: {{
            position: 'left',
            ticks: {{
              color: '#9ca3af',
              callback: function(v) {{ return (v / 10000).toFixed(0) + '만원'; }}
            }},
            grid: {{ color: 'rgba(255, 255, 255, 0.05)' }}
          }},
          y1: {{
            position: 'right',
            grid: {{ display: false }},
            ticks: {{
              color: '#06b6d4',
              callback: function(v) {{ return v + '%'; }}
            }}
          }}
        }}
      }}
    }});
  }}

  function renderMpYearlyTable() {{
    const tbody = document.getElementById('mpYearlyTableBody');
    if (!tbody) return;

    const yearlyMap = {{}};
    rawMonthlyData.forEach(d => {{
      const yr = d.date.substring(0, 4);
      if (!yearlyMap[yr]) yearlyMap[yr] = [];
      yearlyMap[yr].push(d);
    }});

    const years = Object.keys(yearlyMap).sort().reverse();
    let html = '';

    years.forEach(yr => {{
      const list = yearlyMap[yr];
      const count = list.length;
      const endEval = list[list.length - 1].end_eval;
      
      let sumPnl = 0;
      let sumNetCap = 0;
      let winCount = 0;

      list.forEach(item => {{
        sumPnl += item.profit_loss;
        const netFlow = item.deposit - item.withdrawal + item.stock_in - item.stock_out;
        sumNetCap += netFlow;
        if (item.profit_loss > 0) winCount++;
      }});

      const startEval = list[0].base_eval > 0 ? list[0].base_eval : list[0].end_eval;
      const annReturn = startEval > 0 ? (sumPnl / startEval * 100) : 0;
      const winRate = (winCount / count * 100).toFixed(1);
      const isUp = sumPnl >= 0;

      html += `
        <tr>
          <td style="font-weight: 700;">${{yr}}년 <span style="font-size: 12px; color: var(--text-muted);">(${{count}}개월)</span></td>
          <td class="num-col" style="font-weight: 600;">${{formatKRW(endEval)}}</td>
          <td class="num-col" style="font-weight: 700; color: ${{isUp ? 'var(--profit-green)' : 'var(--loss-red)'}};">
            ${{isUp ? '+' : ''}}${{formatKRW(sumPnl)}}
          </td>
          <td class="num-col" style="font-weight: 700; color: ${{isUp ? 'var(--profit-green)' : 'var(--loss-red)'}};">
            ${{isUp ? '+' : ''}}${{annReturn.toFixed(2)}}%
          </td>
          <td class="num-col">${{sumNetCap !== 0 ? formatKRW(sumNetCap) : '-'}}</td>
          <td style="text-align: center;">
            <span class="badge-trend ${{winCount / count >= 0.5 ? 'up' : 'down'}}">
              ${{winCount}}승 ${{count - winCount}}패 (${{winRate}}%)
            </span>
          </td>
        </tr>
      `;
    }});

    tbody.innerHTML = html;
  }}

  function renderMpDetailTable() {{
    const tbody = document.getElementById('mpDetailTableBody');
    if (!tbody) return;

    let list = getFilteredMonthlyData();

    if (mpSearchQuery) {{
      const q = mpSearchQuery.toLowerCase().trim();
      list = list.filter(d => d.date.toLowerCase().includes(q));
    }}

    if (mpSortBy === 'date-desc') {{
      list.sort((a, b) => b.date.localeCompare(a.date));
    }} else if (mpSortBy === 'date-asc') {{
      list.sort((a, b) => a.date.localeCompare(b.date));
    }} else if (mpSortBy === 'profit-desc') {{
      list.sort((a, b) => b.profit_loss - a.profit_loss);
    }} else if (mpSortBy === 'profit-asc') {{
      list.sort((a, b) => a.profit_loss - b.profit_loss);
    }} else if (mpSortBy === 'return-desc') {{
      list.sort((a, b) => b.return_rate - a.return_rate);
    }}

    let html = '';
    list.forEach(d => {{
      const isUp = d.profit_loss >= 0;
      const netFlow = d.deposit - d.withdrawal + d.stock_in - d.stock_out;

      let detailParts = [];
      if (d.deposit > 0) detailParts.push(`입금 +${{formatKRW(d.deposit)}}`);
      if (d.withdrawal > 0) detailParts.push(`출금 -${{formatKRW(d.withdrawal)}}`);
      if (d.stock_in > 0) detailParts.push(`입고 +${{formatKRW(d.stock_in)}}`);
      if (d.stock_out > 0) detailParts.push(`출고 -${{formatKRW(d.stock_out)}}`);

      const detailStr = detailParts.length > 0 ? detailParts.join(', ') : '-';

      html += `
        <tr>
          <td style="font-weight: 700; color: #ffffff;">${{d.date}}</td>
          <td class="num-col">${{formatKRW(d.base_eval)}}</td>
          <td class="num-col" style="font-weight: 600;">${{formatKRW(d.end_eval)}}</td>
          <td class="num-col" style="font-weight: 700; color: ${{isUp ? 'var(--profit-green)' : 'var(--loss-red)'}};">
            ${{isUp ? '+' : ''}}${{formatKRW(d.profit_loss)}}
          </td>
          <td class="num-col" style="font-weight: 700; color: ${{isUp ? 'var(--profit-green)' : 'var(--loss-red)'}};">
            ${{isUp ? '+' : ''}}${{d.return_rate.toFixed(2)}}%
          </td>
          <td class="num-col">${{formatKRW(d.adj_eval)}}</td>
          <td class="num-col" style="color: ${{netFlow > 0 ? 'var(--accent-cyan)' : (netFlow < 0 ? '#f87171' : 'var(--text-muted)')}}; font-weight: 600;">
            ${{netFlow !== 0 ? (netFlow > 0 ? '+' : '') + formatKRW(netFlow) : '-'}}
          </td>
          <td style="text-align: center; font-size: 12px; color: var(--text-muted);">${{detailStr}}</td>
        </tr>
      `;
    }});

    tbody.innerHTML = html || '<tr><td colspan="8" style="text-align:center; padding:20px;">검색된 월별 성과 데이터가 없습니다.</td></tr>';
  }}

  function setupMpEvents() {{
    const periodGroup = document.getElementById('mpPeriodButtonGroup');
    if (periodGroup) {{
      periodGroup.addEventListener('click', (e) => {{
        const btn = e.target.closest('.mp-period-btn');
        if (!btn) return;
        periodGroup.querySelectorAll('.mp-period-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mpSelectedPeriod = btn.dataset.period;
        mpSelectedYear = 'ALL';
        const yrSel = document.getElementById('mpYearSelect');
        if (yrSel) yrSel.value = 'ALL';
        renderMonthlyPerformanceTab();
      }});
    }}

    const yearSelect = document.getElementById('mpYearSelect');
    if (yearSelect) {{
      yearSelect.addEventListener('change', (e) => {{
        mpSelectedYear = e.target.value;
        renderMonthlyPerformanceTab();
      }});
    }}

    const searchInput = document.getElementById('mpSearchInput');
    if (searchInput) {{
      searchInput.addEventListener('input', (e) => {{
        mpSearchQuery = e.target.value;
        renderMpDetailTable();
      }});
    }}

    const sortSelect = document.getElementById('mpSortSelect');
    if (sortSelect) {{
      sortSelect.addEventListener('change', (e) => {{
        mpSortBy = e.target.value;
        renderMpDetailTable();
      }});
    }}

    const btnReload = document.getElementById('btnMpReloadData');
    if (btnReload) {{
      btnReload.addEventListener('click', async () => {{
        await loadMonthlyPerformanceData();
        renderMonthlyPerformanceTab();
        alert('월별투자성과현황(spop_db/월별투자성과현황_2609.xlsx) 데이터를 최신 상태로 새로고침했습니다.');
      }});
    }}
  }}
"""

# Insert mp_code_block before the end of IIFE in app.js
last_iife_end = app_js.rfind("})();")
if last_iife_end >= 0:
    app_js = app_js[:last_iife_end] + "\n" + mp_code_block + "\n" + app_js[last_iife_end:]
    print("Successfully appended mp_code_block to app.js!")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Updated app.js written cleanly!")
