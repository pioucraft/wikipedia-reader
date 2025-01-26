const fs = require("fs");
const path = require("path");
const wiki = require("wikijs").default;

// Read the raw Wikitext content from the file
const rawWikiText = fs.readFileSync(
  path.join(__dirname, "raw_wiki.txt"),
  "utf-8"
);

// Initialize the WikiJS instance
const wikiInstance = wiki();

// Function to fetch and convert the Wikitext to HTML
async function convertToHtml(wikitext) {
  try {
    // Fetch the page content using the raw Wikitext
    const page = await wikiInstance.page("Elon_Musk");

    // Get the HTML content of the page
    const htmlContent = await page.html();

    // Define the output HTML file path
    const outputFilePath = path.join(__dirname, "output.html");

    // Write the HTML content to the output file
    fs.writeFileSync(outputFilePath, htmlContent, "utf-8");

    console.log(`HTML content has been saved to ${outputFilePath}`);
  } catch (error) {
    console.error("Error converting Wikitext to HTML:", error);
  }
}

// Call the function to convert the Wikitext to HTML
convertToHtml(rawWikiText);
