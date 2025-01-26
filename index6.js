const { JSDOM } = require("jsdom");
const Readability = require("readability");
const fs = require("fs");
const https = require("https");

const url = "https://en.wikipedia.org/wiki/Elon_Musk"; // Wikipedia page URL
const outputFilePath = "elon-musk-simplified.html"; // Output file name

// Function to fetch the HTML content of the webpage
function fetchPageContent(url, callback) {
  https
    .get(url, (res) => {
      let data = "";

      // Accumulate data chunks
      res.on("data", (chunk) => {
        data += chunk;
      });

      // Process the full HTML content
      res.on("end", () => {
        callback(null, data);
      });
    })
    .on("error", (err) => {
      callback(err, null);
    });
}

// Fetch the page and process it with Readability
fetchPageContent(url, (err, html) => {
  if (err) {
    console.error("Error fetching the page:", err);
    return;
  }

  const dom = new JSDOM(html, { url }); // Create a DOM object
  const reader = new Readability(dom.window.document); // Ensure the document is properly parsed
  if (!reader) {
    console.error(
      "Error initializing Readability: The DOM might not be properly structured."
    );
    return;
  }
  const article = reader.parse(); // Parse the main content

  if (article) {
    // Save the simplified content to an HTML file
    const styledContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
      background-color: #f9f9f9;
      color: #333;
    }
    h1, h2, h3 {
      color: #1a73e8;
    }
    a {
      color: #1a73e8;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  <h1>${article.title}</h1>
  ${article.content}
</body>
</html>
    `;

    fs.writeFile(outputFilePath, styledContent, (err) => {
      if (err) {
        console.error("Error saving the file:", err);
      } else {
        console.log(`Simplified Wikipedia page saved to ${outputFilePath}`);
      }
    });
  } else {
    console.error("Could not extract content from the page.");
  }
});
