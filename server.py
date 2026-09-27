import http.server
import socketserver
import urllib.request
import urllib.parse
from http import HTTPStatus
import json
import os

PORT = 8080
DB_FILE = "spop_db/db.json"

class ProxyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/load_db':
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            if os.path.exists(DB_FILE):
                with open(DB_FILE, 'rb') as f:
                    self.wfile.write(f.read())
            else:
                self.wfile.write(b'{}')
            return
            
        elif self.path.startswith('/api/stock_info'):
            query = urllib.parse.urlparse(self.path).query
            params = urllib.parse.parse_qs(query)
            stock_name = params.get('name', [''])[0]
            
            result = {
                'name': stock_name,
                'source': '외부 API 분석',
                'category': '분석 불가'
            }
            
            try:
                req = urllib.request.Request("https://openapi.naver.com/v1/search/local.json?query=" + urllib.parse.quote(stock_name))
                with urllib.request.urlopen(req, timeout=1) as r:
                    pass
            except Exception:
                result['source'] = '종목명 기반 분석'
                name_upper = stock_name.upper()
                cat = '기타 자산'
                if 'TDF' in name_upper or '혼합형' in name_upper or '스포츠모드' in name_upper:
                    cat = 'TDF (타겟데이트펀드)'
                elif any(k in name_upper for k in ['미국', '나스닥', 'S&P', '글로벌', '인도', '베트남', '차이나', '해외', 'EURO']):
                    if any(k in name_upper for k in ['국채', '하이일드', '회사채', '인플레이션']):
                        cat = '해외채권'
                    else:
                        cat = '해외주식'
                elif any(k in name_upper for k in ['국고채', '회사채', '채권', 'CD금리', '단기채', '금리', '채혼']):
                    cat = '국내채권'
                elif any(k in name_upper for k in ['현금', 'MMF', '예수금', 'CMA', '머니마켓']):
                    cat = '현금성 자산'
                elif any(k in name_upper for k in ['금현물', '은선물', '원자재']):
                    cat = '원자재'
                elif '리츠' in name_upper or '부동산' in name_upper:
                    cat = '대체투자 (부동산/리츠)'
                elif '공모주' in name_upper:
                    cat = '공모주/혼합형'
                elif any(k in name_upper for k in ['KODEX', 'TIGER', 'ACE', 'SOL', 'KBSTAR', 'ARIRANG', 'HANARO']):
                    cat = '국내주식 (ETF)'
                else:
                    cat = '국내주식 (기타)'
                result['category'] = cat
            
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result, ensure_ascii=False).encode('utf-8'))
            return

        elif self.path.startswith('/api/proxy?url='):
            # Extract the URL to proxy
            query = urllib.parse.urlparse(self.path).query
            params = urllib.parse.parse_qs(query)
            target_url = params.get('url', [''])[0]

            if not target_url:
                self.send_error(HTTPStatus.BAD_REQUEST, "Missing 'url' parameter")
                return

            try:
                # Setup request headers to mimic a browser
                req = urllib.request.Request(target_url, headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    'Accept': '*/*'
                })
                
                with urllib.request.urlopen(req, timeout=5) as response:
                    body = response.read()
                    
                    self.send_response(HTTPStatus.OK)
                    # Important: Allow CORS
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Content-Type', response.headers.get('Content-Type', 'text/plain'))
                    self.end_headers()
                    self.wfile.write(body)
            except Exception as e:
                err_msg = str(e).encode('ascii', errors='ignore').decode('ascii')
                self.send_response(HTTPStatus.INTERNAL_SERVER_ERROR)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-Type', 'text/plain')
                self.end_headers()
                self.wfile.write(f"Proxy error: {err_msg}".encode('utf-8'))
        else:
            # Serve regular files
            super().do_GET()

    def do_POST(self):
        if self.path == '/api/save_db':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            
            os.makedirs(os.path.dirname(DB_FILE), exist_ok=True)
            with open(DB_FILE, 'wb') as f:
                f.write(body)
                
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(b'{"status":"success"}')
        else:
            self.send_error(HTTPStatus.NOT_FOUND)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), ProxyHTTPRequestHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Local CORS proxy available at /api/proxy?url=...")
    print("DB API available at /api/save_db and /api/load_db")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
