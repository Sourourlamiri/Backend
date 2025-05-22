import { Body, Delete, Get, HttpStatus, Injectable, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { IFormation } from './Interface/interface-formation';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Formation } from './entities/formation.entity';
import { ICandidat } from 'src/candidat/Interface/Interface-Candidat';


@Injectable()
export class FormationService {
  
constructor(@InjectModel("Formation") private FormationModel: Model<IFormation>,
@InjectModel("utilisateur") private CandidatModel: Model<ICandidat>) {}

/// créer formation
async createFormation(CreateFormationDto: CreateFormationDto): Promise<IFormation> {

  // relation candidat et formation 
  const newFormation=await new this.FormationModel(CreateFormationDto);

  const SavedFormation = await newFormation. save() as IFormation ;
const CandidatId = await this.CandidatModel.findById(CreateFormationDto.Candidat);
if (CandidatId ){

 CandidatId.Formation.push(SavedFormation._id as mongoose.Types.ObjectId);
const savedCandidat = await CandidatId.save();
console. log(savedCandidat) ;
} else {
console. log("Candidat non trouvé")
 }
return SavedFormation;

}




/// liste des formations
async list(): Promise<IFormation[]> {
    return await this.FormationModel.find();
}

/// supprimer formation
async deleteFormation(id: string): Promise<IFormation> {
    const deleteFormation = await this.FormationModel.findByIdAndDelete(id);
    if (!deleteFormation) {
        throw new NotFoundException(`Formation avec ${id} n'a pas été trouvée!`);
    }
    return deleteFormation;
}

/// modifier formation
async updateFormation(id: string, UpdateFormation: UpdateFormationDto): Promise<IFormation> {
    const updateFormation = await this.FormationModel.findByIdAndUpdate(id, UpdateFormation, { new: true });
    if (!updateFormation) {
        throw new NotFoundException(`Formation avec ${id} n'a pas été modifiée!`);
    }
    return updateFormation;
}

/// obtenir formation par ID
async getbyId(id: string): Promise<IFormation> {
    const getFormation = await this.FormationModel.findById(id);
    if (!getFormation) {
        throw new NotFoundException(`Formation avec ${id} n'a pas été trouvée!`);
    }
    return getFormation;
}




// Méthode delete pour supprimer une formation
async supprimerFormation(formationId: string): Promise<IFormation> {
    // Supprimer la formation de la base de données
    const deleteData = await this.FormationModel.findByIdAndDelete(formationId);
    if (!deleteData) {
      throw new NotFoundException(`La formation avec l'id ${formationId} est introuvable`);
    }
  
    // Mettre à jour le candidat en supprimant la formation correspondante
    const updateCandidat = await this.CandidatModel.findById(deleteData.Candidat);
    if (updateCandidat) {
      // Retirer la formation de la liste des formations du candidat
      updateCandidat.Formation = updateCandidat.Formation.filter(
        (formation) => formation.toString() !== formationId
      );
      await updateCandidat.save();
    } else {
      throw new NotFoundException(`Le candidat avec l'id ${deleteData.Candidat} est introuvable`);
    }
  
    return deleteData;
  }
  
}

