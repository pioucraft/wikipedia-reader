const wiki = require("wikijs").default;

wiki()
  .page("Louis X of France") // Replace 'JavaScript' with your desired article title
  .then((page) => page.content())
  .then((content) => {
    Bun.write("output.json", JSON.stringify(content));
  })
  .catch((err) => console.error(err));
