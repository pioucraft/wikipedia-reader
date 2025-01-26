import { default as wiki } from "wikijs";
import { writeFile } from "fs";

const fetchRawWiki = async (articleTitle) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    articleTitle
  )}&prop=revisions&rvprop=content&format=json`;

  try {
    // Fetch raw wiki markup
    const response = await fetch(url);
    const data = await response.json();
    const page = Object.values(data.query.pages)[0];
    const rawWiki =
      page.revisions?.[0]["*"] || "No raw Wiki content available.";

    // Save raw content to a file
    const filePath = "./raw_wiki.txt";
    writeFile(filePath, rawWiki, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log(`Raw Wiki markup written to ${filePath}`);
      }
    });

    return rawWiki;
  } catch (error) {
    console.error("Error fetching raw Wiki content:", error);
  }
};

const articleTitle = "Elon Musk"; // Replace with your desired article title

fetchRawWiki(articleTitle);
