import { Document, Types } from "mongoose";
import { IUtilisateur } from "src/utilisateur/Interface/Interface-Utilisateur";

export interface IRecruteur extends IUtilisateur {
   role: string;

   readonly image: string;


   

   readonly NomEntreprise: string;
   readonly OffreEmploi: string;
   readonly description: string;

   approved: string;


   Offre: Types.ObjectId[];
   entretien: Types.ObjectId[];
   Avis: Types.ObjectId[];
}
