/*
header-rickroll
sjaks@github.com
*/

var http = require('http');
var fs = require('fs');

// Load movie file and init frames,
// the height of one frame is 12 lines in the .txt file
var movie = fs.readFileSync("movie.txt").toString().split("\n");
var frame = 0;
var inc = 12;
var attributes = "ABCDEFGHIJKL";


http.createServer(function (req, res) {
    if (req.headers['user-agent'].indexOf("curl") < 0) {
        // If the requester is not cURL, prompt the visitor to access this
        // app via cURL. --max-redirs -1 allows infinite redirects
        res.write("$ curl --max-redirs -1 -IL https://sjaks.dy.fi/headers");
        res.end();
        return;
    }

    // Start the loops over at the end of the file
    if (frame + inc > movie.length - 1)
        frame = 0;

    // Format the animation into  HTTP headers
    for (var i = 0; i < inc; i++) {
        let headerAttribute = "X-" + attributes.charAt(i);
        res.setHeader(headerAttribute, "'" +  movie[frame + i].replace(/\r?\n|\r/g, " ") + "'");
    }

    frame += (inc + 1);

    setTimeout(function() {
        res.writeHead(301, {
            Location: "https://sjaks.dy.fi/headers"
        });

        res.end();
    }, 180);
}).listen(6789);
