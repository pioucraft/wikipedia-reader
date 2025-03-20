CREATE TABLE "articles" (
	"link" text PRIMARY KEY NOT NULL,
	"links" jsonb[],
	"loaded" date[],
	"read" date[],
	"weight" integer DEFAULT 0,
	"cached" date DEFAULT 'now()'
);
