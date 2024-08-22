import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "mysql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USERNAME!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DB!,
    port: 3306,
  },
});