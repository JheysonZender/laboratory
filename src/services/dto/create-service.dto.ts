import { IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateServiceDto {

  @IsNumber()
  element: number;

  @IsNumber()
  study: number;

  @IsPositive()
  price: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  description?: string;
}
