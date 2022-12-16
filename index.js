const { scrape } = require("./Scripts/scraper.js");
const https = require("https");
const fs = require("fs");
const url = require("url");

// scrape().then(dataMap => {
//     console.log("---------------------------");
//     console.log("Data upload complete. Creating server...");

//     https.createServer((request, response) => {
//         response.writeHead(200);

//         fs.readFile
//         response.end();
//     }).listen(8081);
// });

//Didn't feel like importing express for something so quick so here ya go
https.createServer((request, response) => {
    console.log("oi")

    //Custom paths
    let pathname = url.parse(request.url);
    console.log(pathname)

    fs.readFile(filePath, (err, data) => {
        if (err)
        {
            console.error(err);
            response.writeHead(404);
        }
        else
        {
            response.writeHead(200); //To do maybe in future: Add content type
            response.write(data.toString());
        }
        response.end();
    });
}).listen(8081);

console.log("127.0.0.1:8081");