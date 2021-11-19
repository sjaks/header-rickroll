/*
header-rickroll
sjaks@github.com
*/

var http = require('http');
var fs = require('fs');


var movie = fs.readFileSync("movie.txt").toString().split("\n");
var frame = 0;
var inc = 12;


http.createServer(function (req, res) {
    if (req.headers['user-agent'].indexOf("curl") < 0) {
        res.write("$ curl --max-redirs -1 -IL https://sjaks.dy.fi/headers");
        res.end();
        return;
    }

    if (frame > movie.length - 1)
        frame = 0;

    for (var i = frame; i < frame + inc; i++) {
        res.setHeader("x-" + (i + 10), "'" +  movie[i].replace(/\r?\n|\r/g, " ") + "'");
    }

    frame += (inc + 1);

    setTimeout(function() {
        res.writeHead(301, {
            Location: "https://sjaks.dy.fi/headers"
        });

        res.end();
    }, 180);
}).listen(6789);
