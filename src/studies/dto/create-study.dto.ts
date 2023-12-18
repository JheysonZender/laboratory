import { IsString, MinLength } from "class-validator";

export class CreateStudyDto {
  @IsString()
  @MinLength(1)
  name: string
}
