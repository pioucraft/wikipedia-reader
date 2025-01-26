const wiki = require("wikipedia");

(async () => {
  try {
    const page = await wiki.page("Elon Musk");
    console.log(page);
    //Response of type @Page object
    const summary = await page.infobox();
    Bun.write("file.json", JSON.stringify(summary));
    //Response of type @wikiSummary - contains the intro and the main image
  } catch (error) {
    console.log(error);
    //=> Typeof wikiError
  }
})();
