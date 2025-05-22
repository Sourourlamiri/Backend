import {  IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose";

export class CreateCompetenceDto {
    @IsString()
    @IsNotEmpty()
    nomCompétence:string
    @IsString()
    @IsNotEmpty()
    niveau:string

    readonly Candidat :Types.ObjectId;
      }
