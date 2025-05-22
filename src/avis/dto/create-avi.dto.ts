import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAvisDto {


  @IsString()
  @IsNotEmpty()
  note: string; 
  @IsString()
  @IsNotEmpty()
  commentaire: string;
  
  readonly Candidat :Types.ObjectId;
  readonly Recruteur :Types.ObjectId;
}