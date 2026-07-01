import { Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { MeController } from "./me.controller.js";
import { ItemsController } from "./items.controller.js";
import { ItemsService } from "./items.service.js";

@Module({
  controllers: [AuthController, MeController, ItemsController],
  providers: [
    AuthService,
    ItemsService,
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          transformOptions: { enableImplicitConversion: false },
        }),
    },
  ],
})
export class AppModule {}
