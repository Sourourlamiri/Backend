import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
@Schema()
export class Administrateur extends Utilisateur {
    rôle:string
   
}
export const AdministrateurSchema = SchemaFactory.createForClass(Administrateur);
