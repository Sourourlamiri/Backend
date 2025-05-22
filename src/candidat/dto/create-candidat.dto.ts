import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateUtilisateurDto } from "src/utilisateur/dto/create-utilisateur.dto";

export class CreateCandidatDto extends CreateUtilisateurDto {
    
    @IsString()
    role: string;

    image: string;

    @IsString()
    @IsNotEmpty()
    Prenom:string;

    @IsString()
    @IsNotEmpty()
    Nom:string;


     @IsNumber()
    @IsNotEmpty()
    CIN:number;


    readonly Formation: Types.ObjectId[];

    readonly Experience: Types.ObjectId[];

    readonly Certification: Types.ObjectId[];

    readonly Competence: Types.ObjectId[];

    readonly entretien: Types.ObjectId[];

     readonly Offre: Types.ObjectId[]; 
     readonly Candidature: Types.ObjectId[]; 
     readonly Avis: Types.ObjectId[];
}
