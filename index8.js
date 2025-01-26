const axios = require("axios");
const fs = require("fs");

async function downloadWikipediaPage(title) {
  const baseUrl = "https://en.wikipedia.org/api/rest_v1/page/html/";
  const sanitizedTitle = encodeURIComponent(title);
  const url = `${baseUrl}${sanitizedTitle}`;

  try {
    const response = await axios.get(url);

    // Save the HTML content to a file
    fs.writeFileSync(
      `${title.replace(/\s+/g, "_")}.html`,
      response.data,
      "utf-8"
    );
    console.log(`Page "${title}" has been saved successfully!`);
  } catch (error) {
    console.error("Error downloading the page:", error);
  }
}

// Call the function with the desired Wikipedia page title
downloadWikipediaPage("Elon_Musk");
