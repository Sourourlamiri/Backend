import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
export class CreateCategorieDto {
    @IsString()
    @IsNotEmpty()
    nom:string
    @IsString()
    @IsNotEmpty()
    description:string
    readonly Offre: Types.ObjectId[];
}
