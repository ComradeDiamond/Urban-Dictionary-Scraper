const DomParser = require('dom-parser');
const parser = new DomParser();
const https = require("https");
const { execute_over_yr } = require("./calendar");
const fs = require("fs");

/**
 * Recursively sends a request to urban dictionary through all its daily pages. Stops when we're out of words.
 * If there are any "daily words" that we count, chuck them into dataMap
 * @param {JSON} dataMap A map that will contain all the year data
 * @param {String} year YYYY
 * @param {String} month MM
 * @param {String} day DD
 * @param {Number} page Page Number. Leave this alone when calling the function
 * @precondition dataMap[year].count exists. But scrape() should have handled that already
 */
function sendRequest(dataMap, year, month, day, page=1)
{
    return new Promise((resolve, reject) => {
        let req = https.get(`https://www.urbandictionary.com/yesterday.php?date=${year}-${month}-${day}&page=${page}`, res => {
            var data = "";

            res.on("data", chunk => {
                data += chunk
            });

            res.on("error", err => {
                console.error(err);
            });

            res.on("end", () => {
                data = parser.parseFromString(data.toString());
                var cnt = data.getElementsByClassName("mt-3")[0].childNodes.length;
                
                dataMap[year].count += cnt;
                console.log(`> ${year}-${month}-${day}-${page}: ${cnt}`)
                fs.writeFile("./data.txt", `${year}-${month}-${day}-${page}: ${cnt}`, {flag: "a"});

                if (cnt != 0)
                {
                    sendRequest(dataMap, year, month, day, page + 1)
                        .then(() => resolve());
                }
                else
                {
                    resolve();
                }
            });
        });

        req.setSocketKeepAlive(true);
        req.on("error", err => console.error(err))
    });
}

/**
 * Goes on UrbanDictionary.com, finds how many words are added per year, and chucks it in dataMap
 * Requires calendar.js to be available
 */
module.exports.scrape = () => new Promise((resolve, reject) => {
    const dataMap = {};  //Felt lazy, here's JSON
    execute_over_yr(1999, new Date().getFullYear(), async (year, month, day) => {
        if (!dataMap[year])
        {
            dataMap[year] = {count: 0};
        }

        await sendRequest(dataMap, year, month, day);
    }).then(() => {
        resolve(dataMap);
    });
})