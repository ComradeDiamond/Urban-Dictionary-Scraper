const { scrape } = require("./Scripts/scraper.js");
const http = require("http");
const fs = require("fs");
const url = require("url");

scrape().then(dataMap => {
    console.log("---------------------------");
    console.log("Data upload complete. Creating server...");

    //Didn't feel like importing express for something so quick so here ya go
    http.createServer((request, response) => {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");

        //Not the most secure thing, but it's a quick project - will expand in future
        let pathname = url.parse(request.url).pathname;
        let filePath = pathname == "/" ? "./Frontend/index.html" : pathname;

        if (filePath == "/getData")
        {
            response.writeHead(200, {
                "Content-Type": "application/json"
            });
            response.end(dataMap);
        }
        else
        {
            fs.readFile(filePath, (err, data) => {
                if (err)
                {
                    console.error(err);
                    response.writeHead(404);
                }
                else
                {
                    response.writeHead(200, {
                        "Content-Length": data.toString().length
                    }); //To do maybe in future: Add content type
                    response.write(data.toString());
                }
                response.end();
            });
        } 
    }).listen(8081);
    console.log("127.0.0.1:8081");
});