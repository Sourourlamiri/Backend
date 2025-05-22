import { Document, Types } from "mongoose";
export interface ICompetence extends Document {
    
    readonly nomCompétence:string
        
    readonly niveau:string
        
    Candidat:Types.ObjectId;
}