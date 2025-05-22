import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
@Schema()
export class Competence{
    @Prop()
    nomCompétence:string
    @Prop()
    niveau:string
    

     @Prop({type: mongoose.Schema.Types.ObjectId,ref:'utilisateur'}) 
            Candidat :Types.ObjectId;
}
export const CompetenceSchema = SchemaFactory.createForClass(Competence);
