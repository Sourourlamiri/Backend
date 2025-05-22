import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";

@Schema()
export class Candidat extends Utilisateur {
    
    role: string;

    @Prop() image: string;
    @Prop() Nom:string
    @Prop() Prenom:string
    @Prop() CIN:number




    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Formation' }] }) 
    Formation: Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }] }) 
    Experience: Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certification' }] }) 
    Certification: Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competence' }] }) 
    Competence: Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'entretien' }] }) 
    entretien: Types.ObjectId[];   

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offre' }] }) 
    Offre: Types.ObjectId[]; 
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidature' }] }) 
    Candidature: Types.ObjectId[]; 
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Avis' }] }) 
    Avis: Types.ObjectId[];

}

export const CandidatSchema = SchemaFactory.createForClass(Candidat);
