import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class UserDto {
  @ApiProperty({ example: "u_1" })
  @IsString()
  id!: string;

  @ApiProperty({ example: "demo@spectra.dev" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "Demo User" })
  @IsString()
  displayName!: string;
}

export class ItemDto {
  @ApiProperty({ example: "it_abc123" })
  @IsString()
  id!: string;

  @ApiProperty({ example: "Buy milk" })
  @IsString()
  @MinLength(1)
  title!: string;

  @ApiProperty({ example: "2026-05-06T10:00:00.000Z", format: "date-time" })
  @IsString()
  createdAt!: string;
}

export class LoginRequestDto {
  @ApiProperty({ example: "demo@spectra.dev" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "demo1234", minLength: 1 })
  @IsString()
  @MinLength(1)
  password!: string;
}

export class LoginResponseDto {
  @ApiProperty({ example: "tk_xxx" })
  @IsString()
  token!: string;

  @ApiProperty({ type: UserDto })
  user!: UserDto;
}

export class MeResponseDto {
  @ApiProperty({ type: UserDto })
  user!: UserDto;
}

export class NewItemDto {
  @ApiProperty({ example: "Buy milk", minLength: 1 })
  @IsString()
  @MinLength(1)
  title!: string;
}

export class ErrorDto {
  @ApiProperty({ example: "unauthorized" })
  @IsString()
  error!: string;
}

export type User = UserDto;
export type Item = ItemDto;
