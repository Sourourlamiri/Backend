import { IsNotEmpty, IsString, IsDateString } from "class-validator";
import { Types } from "mongoose";

export class CreateOffreDto {
    
    @IsString()
    @IsNotEmpty()    
    titre: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    exigences: string;

    @IsDateString()
    @IsNotEmpty()
    date_expiration: Date;

    statut: string;

    @IsString()
    @IsNotEmpty()
    localisation: string;



    readonly Candidat: Types.ObjectId[];

    readonly recruteur: Types.ObjectId;

    readonly entretien: Types.ObjectId[];
    readonly Candidature: Types.ObjectId[];
    readonly Categorie: Types.ObjectId;
}


