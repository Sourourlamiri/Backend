import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUtilisateur } from './Interface/Interface-Utilisateur';
import { join } from 'path';


@Injectable()
export class UtilisateurService {
constructor (@InjectModel("utilisateur") private UtilisateurModel:Model<IUtilisateur>){}
async findUtilisateurByEmail(Email:string)
{
    return this.UtilisateurModel.findOne ({Email})
}

// updete 3adiya bach nroudouha hatche crypté
async updateUser(id:string,UpdateUtilisateurDto):Promise<IUtilisateur>{
    const updateUtilisateurId=await this .UtilisateurModel.findByIdAndUpdate(id,UpdateUtilisateurDto,{new:true})
    if(!updateUtilisateurId){
        throw new NotFoundException(`Utilisateur with this ${id}does not exist`)

    }
return updateUtilisateurId
}


async updateToken(id:any,token:string){ // Fonction pour mettre à jour le token de rafraîchissement ki bach y3awed yod5il 
    const utilisateur=await this.UtilisateurModel.findByIdAndUpdate(id,{refreshToken:token},{new:true})
if(!utilisateur){
    throw new NotFoundException('Utilisateur non trouvé ')
}
return utilisateur
}




async findutilisateurbyId(id:string){ // Fonction pour trouver un utilisateur par son ID
    const utilisateur=await this.UtilisateurModel.findById(id)
    if(!utilisateur){
        throw new NotFoundException(`Utilisateur non trouvé`)
    }
    return utilisateur
}



// Fonction pour vérifier le code de l'utilisateur
async verificationcode(code:string,res:any):Promise<any>{ 
  // Si le code existe, on met à jour l'utilisateur pour indiquer qu'il est 
  //  vérifié  email wa9teli ta3mil inscription yjik code bach yverifie l'email Sinon, on retourne une erreur
    try{
      const existingcode=await this.UtilisateurModel.findOne({code})
      if(!existingcode){
        return res.sendFile(join(__dirname+'../../../verifyEmail/error.html'))
    }
    existingcode.code=null
    existingcode.verify=true
    await existingcode.save()
    return res.sendFile(join(__dirname+'../../../verifyEmail/correct.html'))

  }catch(error) {
    return error
  }
}



  }