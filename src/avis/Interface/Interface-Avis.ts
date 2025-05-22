import { Document, Types } from "mongoose";
export interface IAvis extends Document {
   readonly note:string;
   readonly commentaire: string;

   Candidat:Types.ObjectId;
   Recruteur:Types.ObjectId;
}