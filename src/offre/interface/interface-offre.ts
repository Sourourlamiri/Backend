import { Document, Types } from "mongoose";

export interface IOffre extends Document {
      
    readonly titre: string;
       
    readonly description: string;
    readonly  exigences: string;
       
    statut: string;
       
    
       
    readonly date_expiration: Date;
    
    readonly localisation: string;
   
    Candidat: Types.ObjectId[];
    recruteur: Types.ObjectId;
    entretien: Types.ObjectId[];  
    Candidature: Types.ObjectId[];
    Categorie: Types.ObjectId;
}

