import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
@Schema()
export class Payement{
    @Prop()
    montant:string
   
    
}
export const PaymentSchema = SchemaFactory.createForClass(Payement);