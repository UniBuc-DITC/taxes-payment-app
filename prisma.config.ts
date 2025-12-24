import { config as dotenvxConfig } from "@dotenvx/dotenvx";
import { defineConfig, env } from "prisma/config";

dotenvxConfig({ convention: "nextjs" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
