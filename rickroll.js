/*
      _       _
 ___ (_) __ _| | _____  sjaks@github
/ __|| |/ _` | |/ / __| jaks.fi
\__ \| | (_| |   <\__ \ ------------
|___// |\__,_|_|\_\___/ header-rickroll
   |__/

BRIEF:
Rickroll in HTTP headers
*/

var http = require('http');
var fs = require('fs');


var movie = fs.readFileSync("movie.txt").toString().split("\n");
var frame = 0;
var inc = 12;


http.createServer(function (req, res) {
    if (req.headers['user-agent'].indexOf("curl") < 0) {
        res.write("Please run $curl --max-redirs -1 -IL http://jaks.fi/hrr");
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
            Location: "https://jaks.fi/hrr"
        });

        res.end();
    }, 180);
}).listen(6789);
