import { sql, and, lt, or, isNull } from "drizzle-orm";
import db from "./db";
import { articles } from "./schema";

async function fetchRecommendations() {
    const recommendations = await db
        .select({ link: articles.link, weight: articles.weight })
        .from(articles)
        .where(
            and(
                or(
                    lt(articles.read, sql`NOW() - INTERVAL '3 months'`),
                    isNull(articles.read)
                ),
                or(
                    lt(articles.loaded, sql`NOW() - INTERVAL '2 weeks'`),
                    isNull(articles.loaded)
                )
            )
        )
        .orderBy(articles.weight);

    return recommendations.reverse();
}

export default fetchRecommendations;
