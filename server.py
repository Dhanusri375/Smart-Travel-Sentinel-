"""
Smart Travel Sentinel - Cloud-Ready Web Server & Auto-Launcher
Serves the Smart Travel Sentinel web application with support for both:
1. Cloud hosting environments (Render, Railway, Heroku, Cloud Run, AWS, Docker)
   - Reads PORT and HOST from environment variables
   - Binds to 0.0.0.0 (or custom HOST)
   - Suppresses browser launching in headless cloud environments
2. Local development
   - Defaults to port 8000 (or first open port)
   - Automatically opens default browser
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import argparse

# Ensure UTF-8 output encoding on Windows/cross-platform consoles
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    """Clean HTTP request handler serving files from the project directory."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Keep production & console logs clean
        # Print only requests if in debug or local mode
        if os.environ.get("DEBUG") == "1":
            sys.stderr.write("%s - - [%s] %s\n" %
                             (self.client_address[0],
                              self.log_date_time_string(),
                              format % args))

    def end_headers(self):
        # Add basic security & cache headers for static assets
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

def is_cloud_environment():
    """Detect if running in common cloud environments or CI/containers."""
    cloud_indicators = [
        "PORT" in os.environ,
        "RENDER" in os.environ,
        "RAILWAY_ENVIRONMENT" in os.environ,
        "DYNO" in os.environ,
        "HEROKU_APP_NAME" in os.environ,
        "FLY_APP_NAME" in os.environ,
        "K_SERVICE" in os.environ,  # Google Cloud Run
        "AWS_EXECUTION_ENV" in os.environ,
        "CI" in os.environ
    ]
    return any(cloud_indicators)

def find_available_port(start_port, host=""):
    """Find an available TCP port starting from start_port."""
    import socket
    for port in range(start_port, start_port + 30):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind((host, port))
                return port
            except OSError:
                continue
    return start_port

def parse_args():
    parser = argparse.ArgumentParser(description="Run Smart Travel Sentinel Server")
    parser.add_argument("--host", default=None, help="Host address to bind (e.g. 0.0.0.0 or 127.0.0.1)")
    parser.add_argument("--port", type=int, default=None, help="Port to listen on (e.g. 8000)")
    parser.add_argument("--no-browser", action="store_true", help="Do not open browser automatically")
    return parser.parse_args()

def main():
    args = parse_args()
    is_cloud = is_cloud_environment()

    # 1. Determine Host: CLI arg > HOST env var > 0.0.0.0 (cloud) / 0.0.0.0 (local)
    host = args.host or os.environ.get("HOST", "0.0.0.0")

    # 2. Determine Port: CLI arg > PORT env var > fallback
    if args.port is not None:
        port = args.port
    elif "PORT" in os.environ:
        try:
            port = int(os.environ["PORT"])
        except ValueError:
            port = 8000
    else:
        # Local development: find open port starting from 8000
        port = find_available_port(8000, host)

    url = f"http://{ 'localhost' if host == '0.0.0.0' else host }:{port}"

    print("=" * 68)
    print("  SMART TRAVEL SENTINEL - APPLICATION SERVER")
    print("=" * 68)
    print(f"[*] Serving Directory : {DIRECTORY}")
    print(f"[*] Bound Host       : {host}")
    print(f"[*] Listening Port   : {port}")
    print(f"[*] Access URL       : {url}")
    print(f"[*] Cloud Mode       : {'Active (Headless)' if is_cloud else 'Local Development'}")
    print("=" * 68)

    # Allow immediate address reuse upon restart
    socketserver.TCPServer.allow_reuse_address = True

    # Open browser only in local mode when not suppressed
    should_open_browser = not args.no_browser and not is_cloud
    if should_open_browser:
        print("[*] Launching browser to application URL...")
        try:
            webbrowser.open(url)
        except Exception as e:
            print(f"[!] Could not open browser automatically: {e}")
    else:
        print("[*] Running in headless/cloud mode (browser launch skipped).")

    print("[*] Server is active and listening for incoming requests.")
    print("[*] Press Ctrl+C to terminate.")

    try:
        with socketserver.TCPServer((host, port), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[+] Sentinel server terminated gracefully.")
    except Exception as e:
        print(f"\n[!] Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
