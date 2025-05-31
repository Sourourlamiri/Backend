import { Document, Types } from "mongoose";

export interface ICandidature extends Document {
  readonly Cv: string
  statut: string
  Offre: Types.ObjectId[];
  Candidat: Types.ObjectId[];


}