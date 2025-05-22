import { IsString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class UpdateAvisDto {
    @IsOptional()
    @IsString()
    commentaire?: string;

    @IsOptional()
    @IsNumber()
    note?: number;

    @IsOptional()
    @IsMongoId()
    Candidat?: string;

    @IsOptional()
    @IsMongoId()
    Recruteur?: string;
}
