import { IsString, Length, MinLength } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @Length(8)
  dni: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  lastName: string;
}