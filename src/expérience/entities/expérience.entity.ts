import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
@Schema()
export class Expérience {
    @Prop()
    nomExpérience: string
    @Prop()
    date_Debut: Date
    @Prop()
    date_Fin: Date
    @Prop()
    entreprise: string; // The company or organization where the experience was gained
    @Prop()
    description: string; // Additional details about the experience

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur' })
    Candidat: Types.ObjectId;

}
export const ExpérienceSchema = SchemaFactory.createForClass(Expérience);
