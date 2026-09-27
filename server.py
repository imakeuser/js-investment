import http.server
import socketserver
import urllib.request
import urllib.parse
from http import HTTPStatus

PORT = 8080

class ProxyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/api/proxy?url='):
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

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), ProxyHTTPRequestHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Local CORS proxy available at /api/proxy?url=...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
