import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule, type OpenAPIObject } from "@nestjs/swagger";

// Single source of truth for the demo's OpenAPI document. main.ts serves this
// at /openapi.json and scripts/dump-openapi.ts prints the same thing to stdout,
// so the live spec and the statically generated spec never drift.
export function buildOpenApiDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle("spectra-demo backend")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();

  return SwaggerModule.createDocument(app, config);
}
