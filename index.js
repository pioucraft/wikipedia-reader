// ALGORITHM!!!!!!!!!!!!! DO NOT TOUCH !!!!! ACtually, touch it

let links = [];
let categoryLinks = [];
let allCounts = {};

const fs = require("fs");

const processArticle = async (path) => {
    let data = await (await fetch(`https://en.wikipedia.org/${path}`)).text();

    links = data
        .match(/href="\/wiki\/[^"]+"/g)
        .map((link) => link.match(/\/wiki\/[^"]+/)[0]);

    const categoryPaths = links.filter((link) => link.includes("Category:"));
    console.log(categoryPaths);
    for (let categoryPath of categoryPaths) {
        let categoryData = await (
            await fetch(`https://en.wikipedia.org${categoryPath}`)
        ).text();
        let categoryLinksTemp = categoryData
            .match(/href="\/wiki\/[^"]+"/g)
            .map((link) => link.match(/\/wiki\/[^"]+/)[0]);
        categoryLinks = [...categoryLinks, ...categoryLinksTemp];
    }

    const commonLinks = links.filter((link) => categoryLinks.includes(link));
    let counts = commonLinks.reduce((acc, link) => {
        acc[link] = (acc[link] || 0) + 1;
        return acc;
    }, {});

    for (let [key, value] of Object.entries(counts)) {
        allCounts[key] = (allCounts[key] || 0) + value;
    }
};

const main = async (paths) => {
    for (let path of paths) {
        await processArticle(path);
    }

    const sortedLinks = Object.entries(allCounts)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [key, value]) => {
            if (!key.includes(":")) {
                acc[key] = value;
            }
            return acc;
        }, {});

    console.log(sortedLinks);

    fs.writeFileSync("sortedLinks.json", JSON.stringify(sortedLinks, null, 2));
};

main([
    "/wiki/European_Union",
    "/wiki/Elon_Musk",
    "/wiki/SpaceX",
    "/wiki/France",
    "/wiki/NATO",
    "/wiki/United_States",
    "/wiki/Philosophy",
    "/wiki/Existential_risk_from_artificial_intelligence",
    "/wiki/Artificial_intelligence",
    "/wiki/Computer_science",
    "/wiki/Physics",
    "/wiki/Mathematics",
    "/wiki/Chemistry",
    "/wiki/Biology",
]);
