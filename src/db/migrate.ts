import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "./db";

// Run migrations
async function main() {
    console.log("Running migrations...");

    try {
        await migrate(db, { migrationsFolder: "./drizzle" });
        console.log("Migrations completed successfully");
    } catch (error) {
        console.error("Error during migration:", error);
        process.exit(1);
    }

    process.exit(0);
}

main();
