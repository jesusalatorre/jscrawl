var http = require("http");
var Crawler = require("crawler");

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello world!\n');
}).listen(8080);

hits = []

var c = new Crawler({
    "maxConnections": 10,

    "callback":function (error, result, $) {
        if(result){
            var page = result.body;
            var res = page.match(/Python/i);
            if (res && res.length > 0){
                console.log(result.body);
            }
        }
        $("a").each(function(index, a){
            console.log(a.href);
            c.queue(a.href);
        });
    }
});

c.queue("https://blog.scrapinghub.com/")

console.log('Server running on port 8080')