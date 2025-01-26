const fs = require("fs");
const wtf = require("wtf_wikipedia");

// Read Wikitext from the input file
const inputFilePath = "raw_wiki.txt";
const outputFilePath = "output.json";

fs.readFile(inputFilePath, "utf8", (err, rawWikiText) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    return;
  }

  // Parse Wikitext into HTML
  const doc = wtf(rawWikiText);
  const htmlContent = doc.json();

  // Write the HTML to the output file
  fs.writeFile(outputFilePath, htmlContent, "utf8", (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`);
    } else {
      console.log(`HTML output saved to ${outputFilePath}`);
    }
  });
});
