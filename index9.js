const fs = require("fs");
const wiky = require("wiky.js");

// Read wiki code from raw_wiki.js
const wikiCode = fs.readFileSync("raw_wiki.txt", "utf8");

// Process the wiki code
const html = wiky.process(wikiCode, {});

// Write the resulting HTML to output.html
fs.writeFileSync("output.html", html);
