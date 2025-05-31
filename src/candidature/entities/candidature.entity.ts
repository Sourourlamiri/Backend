import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";


@Schema()
export class Candidature {
  @Prop()
  Cv: string

  @Prop({ default: "en attente", enum: ["acceptée", "rejetée", "en attente"] })
  statut: string;



  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offre', onDelete: 'CASCADE'}] })
  Offre: Types.ObjectId[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur' }] })
  Candidat: Types.ObjectId[];
}
export const CandidatureSchema = SchemaFactory.createForClass(Candidature);
