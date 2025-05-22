import { Document, Types } from "mongoose";
export interface IExpérience extends Document {
    
    readonly nomExpérience:string
        
    readonly date_Debut:Date
    readonly date_Fin:Date
        
     Candidat:Types.ObjectId;
    
}