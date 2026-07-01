import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { AuthedRequest } from "./auth.guard.js";
import { BearerAuthGuard } from "./auth.guard.js";
import { ItemsService } from "./items.service.js";
import { ErrorDto, ItemDto, NewItemDto } from "./schemas.js";

@ApiTags("items")
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller("dashboard/items")
export class ItemsController {
  constructor(private readonly items: ItemsService) {}

  @Get()
  @ApiOperation({ summary: "List items for the current user" })
  @ApiResponse({ status: 200, type: [ItemDto] })
  @ApiResponse({ status: 401, type: ErrorDto })
  list(@Req() req: AuthedRequest): ItemDto[] {
    return this.items.list(req.userId);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new item" })
  @ApiResponse({ status: 201, type: ItemDto })
  @ApiResponse({ status: 400, type: ErrorDto })
  @ApiResponse({ status: 401, type: ErrorDto })
  add(@Req() req: AuthedRequest, @Body() body: NewItemDto): ItemDto {
    return this.items.add(req.userId, body.title);
  }
}
