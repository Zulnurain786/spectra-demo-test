import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module.js";
import { buildOpenApiDocument } from "./openapi.js";

// Boots the Nest app without binding a port, builds the OpenAPI document, prints
// it as a single JSON line to stdout, and exits. This is the offline path that
// mcp-api-contract Strategy 2 (framework auto-gen) shells out to via the
// openapi:gen script. It runs from compiled dist so @nestjs/swagger sees the
// decorator metadata tsc emits. Nest logging is off so stdout is only the JSON.
async function main(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
  });
  app.setGlobalPrefix("api", {
    exclude: ["openapi.json", "docs", "docs/(.*)"],
  });
  const document = buildOpenApiDocument(app);
  await app.close();
  process.stdout.write(JSON.stringify(document));
}

main().catch((err) => {
  process.stderr.write(`dump-openapi failed: ${String(err)}\n`);
  process.exit(1);
});
