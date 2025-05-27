import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUtilisateurDto {
        @IsString()
        @IsNotEmpty()
        Nom:string
        @IsString()
        @IsNotEmpty()
        Email:string
        @IsString()
        @IsNotEmpty()
        Adresse:string
        
        
        @Type(() => Number)
        @IsNumber()
        @IsNotEmpty()
        Telephone:number
        @IsString()
        @IsNotEmpty()
        MotDePasse:string
        refreshToken:string
        code:string | null;
        verify:boolean
        
    }
