import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

export type AvisDocument = Avis & Document;

@Schema({ timestamps: true }) // ajoute createdAt et updatedAt automatiquement
export class Avis {

@Prop()
commentaire: string;

  @Prop({ type: Number, min: 1, max: 5, required: true })
  note: number;

  @Prop({type: mongoose.Schema.Types.ObjectId,ref:'utilisateur'}) 
              Candidat :Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId,ref:'utilisateur'}) 
              Recruteur :Types.ObjectId;
}

export const AvisSchema = SchemaFactory.createForClass(Avis);