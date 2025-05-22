import { Types } from "mongoose";
import { IUtilisateur } from "src/utilisateur/Interface/Interface-Utilisateur";

export interface ICandidat extends IUtilisateur {
    
    role: string;
    readonly Prenom:string
    readonly Nom:string
    
    image: string;
    CIN:number



     Formation: Types.ObjectId[];

     Experience: Types.ObjectId[];

     Certification: Types.ObjectId[];

     Competence: Types.ObjectId[];

     entretien: Types.ObjectId[];
     Candidature: Types.ObjectId[]; 
    
     Offre: Types.ObjectId[];
     Avis: Types.ObjectId[];
}
