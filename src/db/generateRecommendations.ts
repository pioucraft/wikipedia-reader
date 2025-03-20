import db from "./db";

async function updateRecommendations(articles: { link: string }[]) {
    const links = articles.map((article) => article.link);

    for (let link of links) {
        let page = await fetch(link);
        let text = await page.text();
        const wikiLinks = (text.match(/href="\/wiki\/[^"]+"/g) ?? []).map(
            (link) => link.match(/\/wiki\/[^"]+/)?.[0] ?? ""
        );

        const categoryLinks = wikiLinks.filter((link) =>
            link.includes("/Category:")
        );
        let linksFromCategory: string[] = [];
        for (let categoryLink of categoryLinks) {
            let categoryPage = await fetch(
                "https://en.wikipedia.org" + categoryLink
            );
            let categoryText = await categoryPage.text();
            linksFromCategory = linksFromCategory.concat(
                (categoryText.match(/href="\/wiki\/[^"]+"/g) ?? []).map(
                    (link) => link.match(/\/wiki\/[^"]+/)?.[0] ?? ""
                )
            );
            console.log(categoryLink);
        }
        let finalWeightedLinks: any = {};
        for (let finalLink of linksFromCategory) {
            if (wikiLinks.includes(finalLink)) {
                finalWeightedLinks[finalLink] =
                    (finalWeightedLinks[finalLink] ?? 0) + 1;
            }
        }
        finalWeightedLinks = Object.entries(finalWeightedLinks)
            .filter(([key]) => !key.includes(":"))
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .map(([link, weight]) => ({ link, weight: weight as number }));
        console.log(finalWeightedLinks);
    }
}

updateRecommendations([{ link: "https://en.wikipedia.org/wiki/Elon_Musk" }]);
