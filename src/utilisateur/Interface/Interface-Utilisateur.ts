import { Document } from "mongoose";
export interface IUtilisateur extends Document{

   readonly Email:string
   readonly Adresse:string
   readonly Telephone:number


   
   MotDePasse:string
   refreshToken:string |undefined
    code:string | null;
        verify:boolean
}
