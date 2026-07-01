import { Controller, Get, NotFoundException, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service.js";
import type { AuthedRequest } from "./auth.guard.js";
import { BearerAuthGuard } from "./auth.guard.js";
import { ErrorDto, MeResponseDto, UserDto } from "./schemas.js";

@ApiTags("me")
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller("me")
export class MeController {
  constructor(private readonly auth: AuthService) {}

  @Get()
  @ApiOperation({ summary: "Return the current user's profile" })
  @ApiResponse({ status: 200, type: MeResponseDto })
  @ApiResponse({ status: 401, type: ErrorDto })
  me(@Req() req: AuthedRequest): { user: UserDto } {
    const user = this.auth.findById(req.userId);
    if (!user) throw new NotFoundException("not found");
    return { user };
  }
}
