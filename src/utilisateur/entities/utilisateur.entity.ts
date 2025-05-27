import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import* as argon2 from 'argon2'
@Schema({discriminatorKey:"role"})
export class Utilisateur{
    @Prop()
    Nom:string
 

    @Prop({unique:true})
    Email:string
    @Prop()
    Adresse:string
    @Prop()
    Telephone:number
   
    @Prop()
    MotDePasse:string
    @Prop({type:String})
    refreshToken:string |undefined
    @Prop({type:String})
    code:string |null
    @Prop({default:false})
    verify:boolean



}
export const UtilisateurSchema = SchemaFactory.createForClass(Utilisateur)