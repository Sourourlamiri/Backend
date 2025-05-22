import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ timestamps: true}) // date automatiquementment
export class Offre {
    
    @Prop()
    titre: string;

    @Prop()
    description: string;
    @Prop()
    exigences: string;

    @Prop({default: 'ouvert'})
    statut: string;

    @Prop()
    date_expiration: Date;

    @Prop()
    localisation: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur' }] }) 
    Candidat: Types.ObjectId[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'entretien' }] }) 
    entretien: Types.ObjectId[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidature' }] }) 
    Candidature: Types.ObjectId[];
    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Categorie'}) 
                Categorie :Types.ObjectId;
     @Prop({type: mongoose.Schema.Types.ObjectId,ref:'utilisateur'}) 
                recruteur :Types.ObjectId;
} 

export const OffreSchema = SchemaFactory.createForClass(Offre);

