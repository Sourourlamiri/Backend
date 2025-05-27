import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
@Schema()
export class Entretien {
    @Prop()
    titre:string
    @Prop()
    date:Date
    @Prop()
    heure:string
    
    @Prop()
    description:string
    @Prop()
    statut:string
    @Prop()
    link:string
    @Prop()
    type:string
    
    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'utilisateur'}) 
        Candidat :Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'utilisateur'}) 
    Recruteur:Types.ObjectId;

     @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Offre'}) 
        Offre:Types.ObjectId;

//date de debut de l'entretien
        @Prop({ type: Date, required: true })
  dateFin: Date;


}export const EntretienSchema = SchemaFactory.createForClass(Entretien);

