import {  IsNotEmpty,  IsString } from "class-validator";
import { Types } from "mongoose";

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    montant:string;
    


      }
