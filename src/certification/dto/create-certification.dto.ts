import {  IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateCertificationDto {
    @IsString()
    @IsNotEmpty()
    nomCertification:string;
    @IsDateString()
    @IsNotEmpty()
    date_Dobtention:Date;

   readonly Candidat :Types.ObjectId;

      }
