CREATE TABLE "articles" (
	"link" text PRIMARY KEY NOT NULL,
	"links" jsonb[],
	"loaded" date[] DEFAULT '{"now()"}',
	"read" date DEFAULT 'now()',
	"weight" integer DEFAULT 0,
	"cached" date DEFAULT 'now()'
);
