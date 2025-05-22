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

async updateToken(id:any,token:string){
    const utilisateur=await this.UtilisateurModel.findByIdAndUpdate(id,{refreshToken:token},{new:true})
if(!utilisateur){
    throw new NotFoundException('Utilisateur non trouvé ')
}
return utilisateur
}



// Fonction pour réinitialiser le mot de passe
async findutilisateurbyId(id:string){
    const utilisateur=await this.UtilisateurModel.findById(id)
    if(!utilisateur){
        throw new NotFoundException(`Utilisateur non trouvé`)
    }
    return utilisateur
}



//methode vérifier code qund faire la creation de compte
async verificationcode(code:string,res:any):Promise<any>{
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