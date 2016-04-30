from http.server import BaseHTTPRequestHandler, HTTPServer
import cgi
from pprint import pformat

PORT = 9090
FILE_TO_SERVE = '../jss.json'
form = cgi.FieldStorage()

class MyHandler(BaseHTTPRequestHandler):
    """
    For more information on CORS see:
    * https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS
    * http://enable-cors.org/
    """
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-type")

    def do_POST(self):
        
            # set headers
            self.send_response(200)
            self.send_header('Access-Control-Allow-Credentials', 'true')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header("Content-type", "text/json")
            self.end_headers()
			
            print ("Che to")

        

    def do_GET(self, *args, **kwargs):
        """ just for testing """
        self.send_response(200)
        self.send_header("Content-type", "text/xml")
        self.end_headers()
        body = ''
        with open(FILE_TO_SERVE) as f:
            body = f.read()


def httpd(handler_class=MyHandler, server_address=('0.0.0.0', PORT), file_=None):
    try:
        print ("Server started on http://%s:%s/ serving file %s" % (server_address[0], server_address[1], FILE_TO_SERVE))
        srvr = HTTPServer(server_address, handler_class)
        srvr.serve_forever()  # serve_forever
    except KeyboardInterrupt:
        srvr.socket.close()


if __name__ == "__main__":
    """ ./corsdevserver.py """
    httpd()