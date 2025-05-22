import { IsDate, IsDateString, IsNotEmpty, IsString, Matches } from "class-validator";
import { Types } from "mongoose";

export class CreateEntretienDto {
    @IsNotEmpty()
    @IsDateString()
    date:Date;
   
    @IsNotEmpty()
    @IsString()
    description:string;
    @IsNotEmpty()
    @IsString()
    statut:string;
    @IsNotEmpty()
    @IsString()
    titre:string

    @IsNotEmpty()
  @IsDate()
  dateFin: Date; // الحقل الجديد الذي يمثل تاريخ ووقت انتهاء المقابلة
    @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
    message: 'L\'heure doit être au format HH:mm',
  })
  readonly heure: string;
        link:string

     Candidat :Types.ObjectId;
     Offre:Types.ObjectId;
      Recruteur:Types.ObjectId;
  
}