import os
import json
import urllib.request
import urllib.parse
import ssl
import time
import concurrent.futures

KRX_MASTER_FILE = os.path.join(os.path.dirname(__file__), 'krx_master.json')

def fetch_naver_market_page(market, page, page_size=100):
    """Fetch single page of Naver mobile market stocks JSON"""
    res = {}
    try:
        url = f"https://m.stock.naver.com/api/stocks/marketValue/{market}?page={page}&pageSize={page_size}"
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
        })
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            stocks = data.get('stocks', [])
            for s in stocks:
                code = str(s.get('itemCode', '')).strip().zfill(6)
                name = s.get('stockName', '').strip()
                s_type = s.get('stockEndType', 'stock')
                if code and name and len(code) == 6:
                    res[code] = {
                        "code": code,
                        "name": name,
                        "market": market,
                        "type": "ETF" if "etf" in s_type.lower() else "STOCK",
                        "closePrice": s.get('closePriceRaw') or 0
                    }
    except Exception as e:
        pass
    return res

def fetch_all_krx_market_stocks():
    """Fetch all KOSPI, KOSDAQ, KONEX stocks concurrently"""
    stocks = {}
    markets = [('KOSPI', 28), ('KOSDAQ', 20), ('KONEX', 3)]
    tasks = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        for market, max_pages in markets:
            for page in range(1, max_pages + 1):
                tasks.append(executor.submit(fetch_naver_market_page, market, page, 100))

        for f in concurrent.futures.as_completed(tasks):
            res = f.result()
            stocks.update(res)

    print(f"Market Stocks (KOSPI/KOSDAQ/KONEX) Fetched: {len(stocks)} items")
    return stocks

def fetch_all_etfs():
    """Fetch all ETFs from Naver ETF API"""
    etfs = {}
    try:
        url = "https://finance.naver.com/api/sise/etfItemList.nhn"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            res_json = json.loads(response.read().decode('euc-kr', errors='ignore'))
            etf_list = res_json.get('result', {}).get('etfItemList', [])
            for item in etf_list:
                code = str(item.get('itemcode', '')).zfill(6)
                name = item.get('itemname', '').strip()
                if code and name:
                    etfs[code] = {
                        "code": code,
                        "name": name,
                        "market": "ETF",
                        "type": "ETF",
                        "closePrice": item.get('nowVal', 0)
                    }
        print(f"ETFs Fetched: {len(etfs)} items")
    except Exception as e:
        print(f"Notice ETF fetch error: {e}")
    return etfs

def main():
    print("=== Generating Full 2,700+ KRX Master Database (krx_master.json) ===")
    master = {}

    # 1. Fetch all domestic equities (KOSPI, KOSDAQ, KONEX)
    market_stocks = fetch_all_krx_market_stocks()
    master.update(market_stocks)

    # 2. Fetch all domestic ETFs
    etf_stocks = fetch_all_etfs()
    master.update(etf_stocks)

    print(f"Total Unique KRX Master Items: {len(master)}")

    with open(KRX_MASTER_FILE, 'w', encoding='utf-8') as f:
        json.dump(master, f, ensure_ascii=False, indent=2)

    print(f"SUCCESS: Saved {len(master)} items to {KRX_MASTER_FILE}")

if __name__ == '__main__':
    main()
