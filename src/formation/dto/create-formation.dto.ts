import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateFormationDto {
  @IsString()
  @IsNotEmpty()
  nomFormation: string;

  @IsDateString()
  @IsNotEmpty()
  date_obtention: Date;

  @IsString()
  @IsNotEmpty()
  etablissement: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  readonly Candidat: Types.ObjectId;
}


