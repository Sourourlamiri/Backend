import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose";
export class CreateCandidatureDto {


   Cv: String

   @IsOptional()
   @IsString()
   @IsEnum(["acceptée", "rejetée", "en attente"], { message: "Le statut doit être 'acceptée', 'rejetée' ou 'en attente'" })
   statut: string;

   Offre: Types.ObjectId[];
   Candidat: Types.ObjectId[];
}
