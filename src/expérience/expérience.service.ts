import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpérienceDto } from './dto/create-expérience.dto';
import { UpdateExpérienceDto } from './dto/update-expérience.dto';
import { IExpérience } from './Interface/interface-expérience';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICandidat } from 'src/candidat/Interface/Interface-Candidat';


@Injectable()
export class ExpérienceService {

  constructor(
    @InjectModel("Experience") private ExpérienceModel: Model<IExpérience>,
    @InjectModel("utilisateur") private CandidatModel: Model<ICandidat>
  ) {}

  
  async createExperience(CreateExperienceDto: CreateExpérienceDto): Promise<IExpérience> {
    const newExperience = new this.ExpérienceModel(CreateExperienceDto);
    const savedExperience = await newExperience.save() as IExpérience;

    
    const candidat = await this.CandidatModel.findById(CreateExperienceDto.Candidat);
    if (candidat) {
      candidat.Experience.push(savedExperience._id as mongoose.Types.ObjectId);
      await candidat.save();
    } else {
      console.log("Candidat non trouvé");
    }

    return savedExperience;
  }

  
  async list(): Promise<IExpérience[]> {
    return this.ExpérienceModel.find().exec();  
  }

  
  async deleteExpérience(id: string): Promise<IExpérience> {
    const deleteExpérience = await this.ExpérienceModel.findByIdAndDelete(id);
    if (!deleteExpérience) {
      throw new NotFoundException(`Expérience avec ${id} n'été pas trouvé!`);
    }
    return deleteExpérience;
  }

 
  async updateExpérience(id: string, UpdateExpérience: UpdateExpérienceDto): Promise<IExpérience> {
    const updateExpérience = await this.ExpérienceModel.findByIdAndUpdate(id, UpdateExpérience, { new: true });
    if (!updateExpérience) {
      throw new NotFoundException(`Expérience avec ${id} n'été pas modifié!`);
    }
    return updateExpérience;
  }

  
  async getbyId(id: string): Promise<IExpérience> {
    const getExpérience = await this.ExpérienceModel.findById(id);
    if (!getExpérience) {
      throw new NotFoundException(`Expérience avec ${id} n'été pas trouvé!`);
    }
    return getExpérience;
  }




  // Méthode delete pour supprimer une expérience
async supprimerExperience(experienceId: string): Promise<IExpérience> {
  // Supprimer l'expérience de la base de données
  const deleteData = await this.ExpérienceModel.findByIdAndDelete(experienceId);
  if (!deleteData) {
    throw new NotFoundException(`L'expérience avec l'id ${experienceId} est introuvable`);
  }

  // Mettre à jour le candidat en supprimant l'expérience correspondante
  const updateCandidat = await this.CandidatModel.findById(deleteData.Candidat);
  if (updateCandidat) {
    // Retirer l'expérience de la liste des expériences du candidat
    updateCandidat.Experience = updateCandidat.Experience.filter(
      (experience) => experience.toString() !== experienceId
    );
    await updateCandidat.save();
  } else {
    throw new NotFoundException(`Le candidat avec l'id ${deleteData.Candidat} est introuvable`);
  }

  return deleteData;
}

}

