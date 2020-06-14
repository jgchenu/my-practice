var http = require('http');
http.createServer(function(request,response){
  response.writeHead(200,{'Content-type':'application/json'})
  response.end('Hello World');
}).listen(888);
console.log('Server runing at http://127.0.0.1:888')

/**
curl 127.0.0.1:888 -v
* Rebuilt URL to: 127.0.0.1:888/
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 888 (#0)
> GET / HTTP/1.1
> Host: 127.0.0.1:888
> User-Agent: curl/7.54.0
> Accept: *
> 
< HTTP/1.1 200 OK
< Content-type: application/json
< Date: Fri, 23 Aug 2019 08:55:52 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
* Connection #0 to host 127.0.0.1 left intact
Hello World%                      
 */