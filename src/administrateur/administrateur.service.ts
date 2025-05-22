import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministrateurDto } from './dto/create-administrateur.dto';
import { UpdateAdministrateurDto } from './dto/update-administrateur.dto';
import { IAdministrateur } from './Interface/Interface-Administrateur';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class AdministrateurService {
  constructor(@InjectModel("utilisateur") private AdministrateurModel:Model<IAdministrateur>){}
  async createAdministrateur(createAdministrateurDto:CreateAdministrateurDto):Promise<IAdministrateur>{
    const existingAdmin=await this.AdministrateurModel.findOne({rôle:"administrateur"})
    if(!existingAdmin){
      const newAdministrateur=await new this.AdministrateurModel(createAdministrateurDto)
      return newAdministrateur.save()
    }
    console.log("admin déja existe")
    throw new BadRequestException("tu ne peux pas créeer un autre admin")
   
  }


  async updateAdministrateur(id:string,updateadministrateur:UpdateAdministrateurDto):Promise<IAdministrateur>{
    const updateAdministrateur=await this.AdministrateurModel.findByIdAndUpdate(id,updateadministrateur,{new:true})
    if(!updateAdministrateur){
      throw new NotFoundException(`Administrateur avec ${id} n'été pas modifié!`)
  }
    return updateAdministrateur
  
  }
  
  async getbyId(id:string):Promise<IAdministrateur>{
    const getAdministrateur=await this.AdministrateurModel.findById(id)
    if(!getAdministrateur){
      throw new NotFoundException(`Administrateur avec ${id} n'été pas trouvé!`)
  }
    return getAdministrateur
  
  }
}