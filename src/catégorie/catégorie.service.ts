import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-catégorie.dto';
import { UpdateCategorieDto } from './dto/update-catégorie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategorie } from './Interface/interface-catégorie';

@Injectable()
export class CategorieService {
  constructor(@InjectModel("Categorie") private CategorieModel:Model<ICategorie>){}

  async createCategorie(createCategorieDto:CreateCategorieDto):Promise<ICategorie>{
    const newCategorie =await new this.CategorieModel(createCategorieDto);
    return await newCategorie.save();
  }

  async list():Promise<ICategorie[]>{
    return await this.CategorieModel.find();
  }

  async deleteCategorie(id:string):Promise<ICategorie>{
    const deleteCategorie = await this.CategorieModel.findByIdAndDelete(id);
    if(!deleteCategorie){
      throw new NotFoundException(`Categorie avec ${id} n'a pas été trouvée!`);
    }
    return deleteCategorie;
  }

  async updateCategorie(id:string, updateCategorie:UpdateCategorieDto):Promise<ICategorie>{
    const updatedCategorie = await this.CategorieModel.findByIdAndUpdate(id, updateCategorie, {new:true});
    if(!updatedCategorie){
      throw new NotFoundException(`Categorie avec ${id} n'a pas été trouvée!`);
    }
    return updatedCategorie;
  }

  async getbyId(id: string): Promise<ICategorie> {
    const getCategorie = await this.CategorieModel.findById(id)
      .populate({ path: 'Offre', model: 'Offre' }); // "Offre" = nom du modèle exact
  
    if (!getCategorie) {
      throw new NotFoundException(`Categorie avec l'id ${id} n'a pas été trouvée!`);
    }
  
    return getCategorie;
  }
  
  
  
}