/*
header-rickroll
sjaks@github.com
*/

let http = require('http');
let fs = require('fs');

// Load movie file and init frames,
// the height of one frame is 12 lines in the .txt file
let movie = fs.readFileSync("movie.txt").toString().split("\n");
let frame = 0;
let inc = 12;
let attributes = "ABCDEFGHIJKL";


http.createServer(function (req, res) {
    if (req.headers['user-agent'].indexOf("curl") < 0) {
        // If the requester is not cURL, prompt the visitor to access this
        // app via cURL. --max-redirs -1 allows infinite redirects
        res.write("$ curl --max-redirs -1 -IL " + req.headers.host + req.url);
        res.end();
        return;
    }

    // Start the loops over at the end of the file
    if (frame + inc > movie.length - 1)
        frame = 0;

    // Format the animation into  HTTP headers
    for (let i = 0; i < inc; i++) {
        let headerAttribute = "X-" + attributes.charAt(i);
        res.setHeader(headerAttribute, "'" +  movie[frame + i].replace(/\r?\n|\r/g, " ") + "'");
    }

    frame += (inc + 1);

    setTimeout(function() {
        res.writeHead(301, {
            Location: req.url
        });

        res.end();
    }, 180);
}).listen(6789);
