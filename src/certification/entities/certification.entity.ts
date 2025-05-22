import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
@Schema()
export class Certification {
    @Prop()
    nomCertification:string
    @Prop()
    date_Dobtention:Date


    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'utilisateur'}) 
        Candidat :Types.ObjectId;
    
}
export const CetificationSchema = SchemaFactory.createForClass(Certification);
