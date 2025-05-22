import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateExpérienceDto {
  @IsString()
  @IsNotEmpty()
  nomExpérience: string;
  @IsDateString()
  @IsNotEmpty()
  date_Debut: Date;
  @IsDateString()
  @IsNotEmpty()
  date_Fin: Date;

  readonly Candidat: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  entreprise: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
