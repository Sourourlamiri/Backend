import { Document } from "mongoose";
import { IUtilisateur } from "src/utilisateur/Interface/Interface-Utilisateur";
export interface IAdministrateur extends IUtilisateur{rôle:string}
