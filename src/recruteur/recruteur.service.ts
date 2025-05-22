import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecruteurDto } from './dto/create-recruteur.dto';
import { UpdateRecruteurDto } from './dto/update-recruteur.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IRecruteur } from './Interface/Interface-Recruteur';
import { Model, Types } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import* as crypto from 'crypto';
import { Subject } from 'rxjs';
import { text } from 'stream/consumers';
import * as argon2 from 'argon2';

@Injectable()
export class RecruteurService {
  constructor(@InjectModel("utilisateur") private RecruteurModel:Model<IRecruteur>,private mailerservice:MailerService){}
  hashData(data: string) {
    return argon2.hash(data);
  }

  async generatCode():Promise<string>{
    return crypto.randomBytes(3).toString('hex').toUpperCase();
  }

// methode create Recruteur

  async createRecruteur(CreateRecruteurDto:CreateRecruteurDto):Promise<IRecruteur>{
    const hashedPassword=await this.hashData(CreateRecruteurDto.MotDePasse)

  const code =await this .generatCode()
  const mailoptions={
    to:CreateRecruteurDto.Email,
    Subject:'verification de votre adresse email',
    text:`votre code de vérification est : ${code}`,
     html:`<p> votre code de vérification est :<strong><a href=http://localhost:5002/utilisateur/verify/${code}>${code}</a></strong></p>`,

    };
    await this.mailerservice.sendMail(mailoptions);
      const newRecruteur=await new this.RecruteurModel({...CreateRecruteurDto,code:code,MotDePasse:hashedPassword})
      return await newRecruteur.save()
    }

  
  async list():Promise<IRecruteur[]>{
    const Recruteur=await this.RecruteurModel.find({role:"recruteur"})
    return Recruteur
  
  }
  async deleteRecruteur(id:string):Promise<IRecruteur>{
    const deleteRecruteur=await this.RecruteurModel.findByIdAndDelete(id)
    if(!deleteRecruteur){
      throw new NotFoundException(`Recruteur avec ${id} n'été pas trouvé!`)
  }
    return deleteRecruteur
  
  }
  
  async updateRecruteur(id:string,updaterecruteur:UpdateRecruteurDto):Promise<IRecruteur>{
    const updateRecruteur=await this.RecruteurModel.findByIdAndUpdate(id,updaterecruteur,{new:true})
    if(!updateRecruteur){
      throw new NotFoundException(`Recruteur avec ${id} n'été pas modifié!`)
  }
    return updateRecruteur
  
  }
  
  async getbyId(id:string):Promise<IRecruteur>{
    const getRecruteur=await this.RecruteurModel.findById(id).populate('Offre').populate('Candidature').populate({path:'entretien',populate:{path:'Candidat'}})
    if(!getRecruteur){
      throw new NotFoundException(`Recruteur avec ${id} n'été pas trouvé!`)
  }
    return getRecruteur
  
  }





  // Desactiver compte recruteur 
  async desactiver(id: string): Promise<IRecruteur> {
    if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`ID invalide : ${id}`);
    }

    const recruteur = await this.RecruteurModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id), role: "recruteur" },
        { $set: { activer: "désactivé" } }, // Désactiver le compte
        { new: true, runValidators: true }
    );

    if (!recruteur) {
        throw new NotFoundException(`Recruteur avec l'ID ${id} introuvable`);
    }

    console.log(`Recruteur ${id} désactivé avec succès.`);
    return recruteur;
}


// active compte recruteur
async activer(id: string): Promise<IRecruteur> {
  if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`ID invalide : ${id}`);
  }

  const recruteur = await this.RecruteurModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), role: "recruteur" },
      { $set: { approved: "activé" } }, // Utilisation de "activé"
      { new: true, runValidators: true }
  );

  if (!recruteur) {
      throw new NotFoundException(`Recruteur avec l'ID ${id} introuvable`);
  }

  console.log(`Recruteur ${id} activé avec succès.`);
  return recruteur;
}



// Méthode pour compter le nombre total de recruteurs
async countRecruteurs(): Promise<number> {
  const count = await this.RecruteurModel.countDocuments({ role: 'recruteur' });
    return count;
  }


  // Méthode pour compter le nombre total de postes disponibles par chaque recruteur
  async nbPosteDispo(): Promise<any[]> {
    const recruteurs = await this.RecruteurModel.find({ role: 'recruteur' }).select('Nom Offre');
    const result = recruteurs.map((recruteur) => {
      const nbOffres = recruteur.Offre ? recruteur.Offre.length : 0;
      console.log('Recruteur:', recruteur.NomEntreprise);
      console.log('Nombre d\'offres:', nbOffres);
      return {
        recruteurId: recruteur._id,
        nom: recruteur.NomEntreprise,
        nbOffres: nbOffres,
      };
    });
    return result;
  }

  
  }
  