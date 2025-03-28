import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    dbCredentials: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST ?? "",
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME ?? "",
    },
});
