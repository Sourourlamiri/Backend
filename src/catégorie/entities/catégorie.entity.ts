import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
@Schema()
export class Categorie {
    @Prop()
    nom:string
    @Prop()
    description:string
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offre' }] }) 
        Offre: Types.ObjectId[];
        
}
export const Categorieschema = SchemaFactory.createForClass(Categorie);
