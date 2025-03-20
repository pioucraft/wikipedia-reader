import { date, integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
    link: text("link").primaryKey(),
    links: jsonb("links").$type<{ link: string; weight: number }>().array(),
    loaded: date("loaded").array().default(["now()"]),
    read: date("read").default("now()"),
    weight: integer("weight").default(0),
    cached: date("cached").default("now()"),
});
