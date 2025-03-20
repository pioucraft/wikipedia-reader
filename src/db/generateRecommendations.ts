import { gt, sql } from "drizzle-orm";
import db from "./db";
import { articles } from "./schema";

async function updateSingleRecommendations(articlesList: string[]) {
    for (let link of articlesList) {
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

        await db
            .insert(articles)
            .values({
                link,
                links: finalWeightedLinks,
            })
            .onConflictDoUpdate({
                target: articles.link,
                set: { links: finalWeightedLinks, cached: "now()" },
            });
        console.log("Updated recommendations for", link);
    }
}

async function updateRecommendations() {
    const staleArticles = await db
        .select()
        .from(articles)
        .where(gt(articles.read, sql`NOW() - INTERVAL '3 months'`));

    const articlesToUpdate = staleArticles.filter(
        (article) =>
            !article.links ||
            (article.cached &&
                new Date(article.cached) <
                    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    );

    await updateSingleRecommendations(
        articlesToUpdate.map((article) => article.link)
    );
}

export default updateRecommendations;
