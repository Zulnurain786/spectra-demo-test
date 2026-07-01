import "reflect-metadata";
import type { Express, Request, Response, NextFunction } from "express";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module.js";
import { buildOpenApiDocument } from "./openapi.js";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: false,
    bodyParser: true,
    logger: ["log", "warn", "error"],
  });

  app.setGlobalPrefix("api", {
    exclude: ["openapi.json", "docs", "docs/(.*)"],
  });

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  const document = buildOpenApiDocument(app);
  SwaggerModule.setup("docs", app, document);

  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.get("/openapi.json", (_req: Request, res: Response) => {
    res.json(document);
  });

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port, "0.0.0.0");
  process.stdout.write(`spectra-demo backend listening on :${port}\n`);
}

bootstrap().catch((err) => {
  process.stderr.write(`Fatal: ${String(err)}\n`);
  process.exit(1);
});
