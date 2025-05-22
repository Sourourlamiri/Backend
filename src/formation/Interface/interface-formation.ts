import { Document, Types } from "mongoose";
export interface IFormation extends Document {
    
    readonly nomFormation:string
        
    readonly date_obtention:string
        
    Candidat:Types.ObjectId;
    
}