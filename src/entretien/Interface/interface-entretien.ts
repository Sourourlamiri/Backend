import { Matches } from "class-validator";
import { Document, Types } from "mongoose"
export interface IEntretien extends Document{
    readonly date:Date
    readonly heure:string
    readonly description:string
      
    readonly titre:string
    readonly statut:string
    readonly type:string
        link:string

    Candidat:Types.ObjectId;
    Recruteur:Types.ObjectId;
    Offre:Types.ObjectId;
}