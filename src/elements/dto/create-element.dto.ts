import { IsString, MinLength } from "class-validator";

export class CreateElementDto {

  @IsString()
  @MinLength(1)
  name: string;
}
