const fs = require("fs");
const readline = require("readline");
// Given that we already collected the data, use the backup in data instead of sending 
// a ton of HTTPS requests

module.exports.loadBackup = () => new Promise((resolve, reject) => {
    const dataMap = {};
    const rl = readline.createInterface({
        input: fs.createReadStream("./data.txt"),
        terminal: false
    })

    rl.on("line", line => {
        const year = line.substring(0, 4);
        if (!dataMap[year])
        {
            dataMap[year] = {count: 0};
        }
        dataMap[year].count += parseInt(line.substring(line.indexOf(": ") + 2));
    })
    
    rl.on("close", () => {
        resolve(dataMap);
    })
})

// this.loadBackup().then(dataMap => console.log(dataMap));