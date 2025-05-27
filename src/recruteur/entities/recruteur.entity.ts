import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";

@Schema()
export class Recruteur extends Utilisateur {
    @Prop()
    NomEntreprise: string

    role: string;
    @Prop()
    image: string;
    @Prop()
    description: string;

    @Prop({ default: "en attente" })
    approved: string;


    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offre' }] })
    Offre: Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'entretien' }] })
    entretien: Types.ObjectId[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'avis' }] })
    Avis: Types.ObjectId[];
}

export const RecruteurSchema = SchemaFactory.createForClass(Recruteur);
