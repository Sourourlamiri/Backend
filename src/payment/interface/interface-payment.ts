import { Document, Types } from "mongoose";
export interface IPayement extends Document {
    readonly montant:string
}
