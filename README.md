# Urban-Dictionary-Scraper
**Written by:** Justin Chen <br />
A quick Node.js code to aggregate Urban Dictionary entries by web scraping their PHP query and display the data in a graph.

# Dependencies
This program uses DOMParser (check package-lock.json) and <a href="https://www.chartjs.org/">Chart.js</a>.

# How to Run
Install Dependencies: `$npm install` <br />
Start Program: `node index.js` <br /> <br />

This code currently stores results in ./data.txt as it takes ~45 minutes to web scrape the information. To scrape program data from scratch, delete ./data.txt and replace `loadBackup()` with `scrape()` in index.js
