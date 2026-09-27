import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Replace handleExcelFile implementation
old_handle_excel = """  function handleExcelFile(file) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      try {
        const newDataset = parseSpopArrayBuffer(e.target.result, file.name);
        if (!newDataset || newDataset.items.length === 0) {
          alert('엑셀 파일에서 보유 종목 데이터를 읽을 수 없습니다.');
          return;
        }

        // Remove cleared flag upon uploading new file
        localStorage.removeItem('js_db_cleared');

        // Remove from deleted blacklist if previously deleted
        const deletedDatesJson = localStorage.getItem('js_deleted_snapshots');
        if (deletedDatesJson) {
          try {
            const deletedDates = JSON.parse(deletedDatesJson);
            const filtered = deletedDates.filter(d => d !== newDataset.date);
            localStorage.setItem('js_deleted_snapshots', JSON.stringify(filtered));
          } catch(e) {}
        }

        const existingIdx = rawDatasets.findIndex(d => d.date === newDataset.date);
        if (existingIdx >= 0) {
          rawDatasets[existingIdx] = newDataset;
          selectedSnapshotIndex = existingIdx;
        } else {
          rawDatasets.push(newDataset);
          rawDatasets.sort((a, b) => new Date(a.date) - new Date(b.date));
          selectedSnapshotIndex = rawDatasets.findIndex(d => d.date === newDataset.date);
        }

        const customOnly = rawDatasets.filter(d => d.date !== '2026-06-28' && d.date !== '2026-09-12');
        localStorage.setItem('js_investment_custom', JSON.stringify(customOnly));

        const modal = document.getElementById('uploadModal');
        if (modal) modal.classList.remove('active');
        alert(`${newDataset.date} 스냅샷 데이터가 성공적으로 추가되었습니다!`);

        renderDateButtons();
        renderDashboard();
      } catch (err) {
        console.error(err);
        alert(err.message || '엑셀 파일을 파싱하는 도중 오류가 발생했습니다.');
      }
    };
    reader.readAsArrayBuffer(file);
  }"""

new_handle_excel = """  function handleExcelFile(file) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      try {
        const arrayBuffer = e.target.result;
        
        // 1. Try parsing as Monthly Performance Excel first if filename or content matches
        const isMonthlyFilename = file.name.includes('월별') || file.name.includes('성과') || file.name.includes('monthly');
        const parsedMonthly = parseMonthlyPerformanceArrayBuffer(arrayBuffer);

        if (isMonthlyFilename || (parsedMonthly && parsedMonthly.length >= 2)) {
          if (parsedMonthly && parsedMonthly.length > 0) {
            rawMonthlyData = parsedMonthly;
            localStorage.setItem('js_monthly_performance_custom', JSON.stringify(rawMonthlyData));
            
            const modal = document.getElementById('uploadModal');
            if (modal) modal.classList.remove('active');

            renderMonthlyPerformanceTab();
            renderSnapshotMpStatusCard();

            const startD = rawMonthlyData[0].date;
            const endD = rawMonthlyData[rawMonthlyData.length - 1].date;
            alert(`월별 투자성과 엑셀 파일이 성공적으로 등록되었습니다!\\n\\n- 파일명: ${file.name}\\n- 분석 기간: ${startD} ~ ${endD} (총 ${rawMonthlyData.length}개월)\\n- '월별 투자성과' 탭에서 시계열 그래프를 확인할 수 있습니다.`);
            return;
          }
        }

        // 2. Fallback to SPOP Holdings Snapshot Excel Parser
        const newDataset = parseSpopArrayBuffer(arrayBuffer, file.name);
        if (!newDataset || newDataset.items.length === 0) {
          alert('엑셀 파일에서 보유 종목 또는 월별 투자성과 데이터를 읽을 수 없습니다.');
          return;
        }

        localStorage.removeItem('js_db_cleared');
        const deletedDatesJson = localStorage.getItem('js_deleted_snapshots');
        if (deletedDatesJson) {
          try {
            const deletedDates = JSON.parse(deletedDatesJson);
            const filtered = deletedDates.filter(d => d !== newDataset.date);
            localStorage.setItem('js_deleted_snapshots', JSON.stringify(filtered));
          } catch(e) {}
        }

        const existingIdx = rawDatasets.findIndex(d => d.date === newDataset.date);
        if (existingIdx >= 0) {
          rawDatasets[existingIdx] = newDataset;
          selectedSnapshotIndex = existingIdx;
        } else {
          rawDatasets.push(newDataset);
          rawDatasets.sort((a, b) => new Date(a.date) - new Date(b.date));
          selectedSnapshotIndex = rawDatasets.findIndex(d => d.date === newDataset.date);
        }

        const customOnly = rawDatasets.filter(d => d.date !== '2026-06-28' && d.date !== '2026-09-12');
        localStorage.setItem('js_investment_custom', JSON.stringify(customOnly));

        const modal = document.getElementById('uploadModal');
        if (modal) modal.classList.remove('active');
        alert(`${newDataset.date} 스냅샷 데이터가 성공적으로 추가되었습니다!`);

        renderDateButtons();
        renderDashboard();
      } catch (err) {
        console.error(err);
        alert(err.message || '엑셀 파일을 파싱하는 도중 오류가 발생했습니다.');
      }
    };
    reader.readAsArrayBuffer(file);
  }"""

if old_handle_excel in app_js:
    app_js = app_js.replace(old_handle_excel, new_handle_excel, 1)
    print("Replaced handleExcelFile successfully!")
else:
    print("WARNING: old_handle_excel not matched exactly!")

# Replace loadMonthlyPerformanceData implementation
old_load_mp = """  async function loadMonthlyPerformanceData() {
    try {
      const res = await fetch('/spop_db/월별투자성과현황_2609.xlsx');
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const parsed = parseMonthlyPerformanceArrayBuffer(buf);
        if (parsed && parsed.length > 0) {
          rawMonthlyData = parsed;
          if (activeTabId === 'tab-monthly-performance') renderMonthlyPerformanceTab();
          return;
        }
      }
    } catch (e) {
      console.warn('Fetched monthly performance excel failed, falling back to preloaded data:', e);
    }
    rawMonthlyData = PRELOADED_MONTHLY_PERFORMANCE;
    if (activeTabId === 'tab-monthly-performance') renderMonthlyPerformanceTab();
  }"""

new_load_mp = """  function renderSnapshotMpStatusCard() {
    const titleEl = document.getElementById('snapshotMpStatusTitle');
    const subEl = document.getElementById('snapshotMpStatusSub');
    if (!titleEl || !subEl || !rawMonthlyData || rawMonthlyData.length === 0) return;

    const startD = rawMonthlyData[0].date;
    const endD = rawMonthlyData[rawMonthlyData.length - 1].date;
    const count = rawMonthlyData.length;
    const latest = rawMonthlyData[rawMonthlyData.length - 1];
    const customSaved = localStorage.getItem('js_monthly_performance_custom');
    const sourceText = customSaved ? '사용자 업로드 엑셀 파일' : 'spop_db/월별투자성과현황_2609.xlsx';

    const isProfitUp = latest.cum_profit >= 0;
    titleEl.innerHTML = `<i data-lucide="check-circle" style="color: var(--profit-green); width: 16px; height: 16px;"></i> 월별 성과 데이터: ${startD} ~ ${endD} (총 ${count}개월)`;
    subEl.innerHTML = `출처: <strong>${sourceText}</strong> | 최신 기말 평가금액: ${formatKRW(latest.end_eval)} | 누적 손익: <strong style="color: ${isProfitUp ? 'var(--profit-green)' : 'var(--loss-red)'}">${isProfitUp ? '+' : ''}${formatKRW(latest.cum_profit)}</strong>`;

    if (window.lucide) window.lucide.createIcons();
  }

  async function loadMonthlyPerformanceData() {
    const customSaved = localStorage.getItem('js_monthly_performance_custom');
    if (customSaved) {
      try {
        const parsedCustom = JSON.parse(customSaved);
        if (Array.isArray(parsedCustom) && parsedCustom.length > 0) {
          rawMonthlyData = parsedCustom;
          if (activeTabId === 'tab-monthly-performance') renderMonthlyPerformanceTab();
          renderSnapshotMpStatusCard();
          return;
        }
      } catch(e) {}
    }

    try {
      const res = await fetch('/spop_db/월별투자성과현황_2609.xlsx');
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const parsed = parseMonthlyPerformanceArrayBuffer(buf);
        if (parsed && parsed.length > 0) {
          rawMonthlyData = parsed;
          if (activeTabId === 'tab-monthly-performance') renderMonthlyPerformanceTab();
          renderSnapshotMpStatusCard();
          return;
        }
      }
    } catch (e) {
      console.warn('Fetched monthly performance excel failed, falling back to preloaded data:', e);
    }
    rawMonthlyData = PRELOADED_MONTHLY_PERFORMANCE;
    if (activeTabId === 'tab-monthly-performance') renderMonthlyPerformanceTab();
    renderSnapshotMpStatusCard();
  }"""

if old_load_mp in app_js:
    app_js = app_js.replace(old_load_mp, new_load_mp, 1)
    print("Replaced loadMonthlyPerformanceData successfully!")
else:
    print("WARNING: old_load_mp not matched exactly!")

# Add button handlers to setupMpEvents
old_setup_mp = """    const btnReload = document.getElementById('btnMpReloadData');
    if (btnReload) {
      btnReload.addEventListener('click', async () => {
        await loadMonthlyPerformanceData();
        renderMonthlyPerformanceTab();
        alert('월별투자성과현황(spop_db/월별투자성과현황_2609.xlsx) 데이터를 최신 상태로 새로고침했습니다.');
      });
    }
  }"""

new_setup_mp = """    const btnReload = document.getElementById('btnMpReloadData');
    if (btnReload) {
      btnReload.addEventListener('click', async () => {
        await loadMonthlyPerformanceData();
        renderMonthlyPerformanceTab();
        alert('월별투자성과현황(spop_db/월별투자성과현황_2609.xlsx) 데이터를 최신 상태로 새로고침했습니다.');
      });
    }

    const btnUploadMonthlyTab = document.getElementById('btnUploadMonthlyExcelTab');
    const monthlyFileInput = document.getElementById('monthlyExcelFileInput');
    const btnResetMonthlyTab = document.getElementById('btnResetMonthlyExcelTab');

    if (btnUploadMonthlyTab && monthlyFileInput) {
      btnUploadMonthlyTab.addEventListener('click', () => {
        monthlyFileInput.click();
      });
      monthlyFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleExcelFile(e.target.files[0]);
      });
    }

    if (btnResetMonthlyTab) {
      btnResetMonthlyTab.addEventListener('click', async () => {
        if (confirm('월별 투자성과 데이터를 기본 데이터(spop_db 샘플)로 복원하시겠습니까?')) {
          localStorage.removeItem('js_monthly_performance_custom');
          await loadMonthlyPerformanceData();
          renderMonthlyPerformanceTab();
          alert('기본 월별 투자성과 데이터가 성공적으로 복원되었습니다.');
        }
      });
    }
  }"""

if old_setup_mp in app_js:
    app_js = app_js.replace(old_setup_mp, new_setup_mp, 1)
    print("Replaced setupMpEvents successfully!")
else:
    print("WARNING: old_setup_mp not matched exactly!")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Updated app.js for monthly upload integration!")
