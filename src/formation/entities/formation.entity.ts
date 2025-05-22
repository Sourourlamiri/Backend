import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
@Schema()
export class Formation {
    @Prop()
    nomFormation: string
    @Prop()
    date_obtention: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur' })
    Candidat: Types.ObjectId;

    @Prop()
    etablissement: string; // The institution where the formation was obtained

    @Prop()
    description: string; // Additional details about the formation
}
export const FormationSchema = SchemaFactory.createForClass(Formation);

