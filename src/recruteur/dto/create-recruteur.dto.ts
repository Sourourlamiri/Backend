import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateUtilisateurDto } from "src/utilisateur/dto/create-utilisateur.dto";

export class CreateRecruteurDto extends CreateUtilisateurDto {
    
     approved: string;
       @IsString()
        @IsNotEmpty()
        NomEntreprise:string

    image: string;
     description: string;
 

     Offre: Types.ObjectId[];
     entretien: Types.ObjectId[];
     Avis: Types.ObjectId[];
}
