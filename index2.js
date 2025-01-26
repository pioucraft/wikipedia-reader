const fs = require("fs");
const path = require("path");
const wikiparser = require("wikiparser");

// Function to read and parse the wikitext file
function parseWikiText(inputFilePath, outputFilePath) {
  // Read the raw wikitext from the file
  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Parse the wikitext to HTML
    const htmlContent = wikiparser.parse(data);

    // Write the parsed HTML to the output file
    fs.writeFile(outputFilePath, htmlContent, (writeErr) => {
      if (writeErr) {
        console.error("Error writing the HTML file:", writeErr);
      } else {
        console.log(`Parsed HTML output saved to ${outputFilePath}`);
      }
    });
  });
}

// Define the input and output file paths
const inputFilePath = path.join(__dirname, "raw_wiki.txt"); // Replace with your wikitext file path
const outputFilePath = path.join(__dirname, "parsed_output.html");

// Call the function to parse the wikitext
parseWikiText(inputFilePath, outputFilePath);
