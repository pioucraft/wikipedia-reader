// @ts-nocheck
import { serve } from "bun";
import { JSDOM } from "jsdom"

import index from "./index.html";

const server = serve({
  routes: {
    "/api/wiki/:name": async (req) => {
      const name = req.params.name;
      let response = await fetchWikipediaHTML(name)
      return new Response(response, {
        headers: { 'Content-Type': 'text/html' }
      });
    },
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);

async function fetchWikipediaHTML(name: string): Promise<string> {
  let html = await (await fetch(`https://en.wikipedia.org/w/index.php?title=${name}`)).text();
  html = html.replaceAll('href="/w/', 'href="https://en.wikipedia.org/w/')
  html = html.replaceAll('href="/wiki/', 'href="/api/wiki/')

  const doc = new JSDOM(html)

  let DIVsToRemove = ["vector-header-container", "vector-page-toolbar-container", "vector-dropdown", "vector-column-end", "vector-pinnable-header-toggle-button", "mw-footer-container"]

  DIVsToRemove.forEach(element => {
    removeDivFromDOM(doc, element)
  })

  html = doc.serialize();


  
  return html
}

function removeDivFromDOM(DOM, className) {
  let elementsToRemove = DOM.window.document.getElementsByClassName(className)

  while (elementsToRemove.length > 0) {
    elementsToRemove[0].parentNode.removeChild(elementsToRemove[0]);
  }
}