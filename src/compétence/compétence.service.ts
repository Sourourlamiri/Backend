import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-compétence.dto';
import { UpdateCompetenceDto } from './dto/update-compétence.dto';
import mongoose, { Model } from 'mongoose';
import { ICompetence } from './Interface/interface-compétence';
import { InjectModel } from '@nestjs/mongoose';
import { ICandidat } from 'src/candidat/Interface/Interface-Candidat';

@Injectable()
export class CompetenceService {
constructor(@InjectModel("Competence") private CompetenceModel: Model<ICompetence>,
@InjectModel("utilisateur") private CandidatModel: Model<ICandidat>) {}

/// créer Competence
async createCompetence(CreateCompetenceDto: CreateCompetenceDto): Promise<ICompetence> {

  // relation candidat et Competence
  const newCompetence=await new this.CompetenceModel(CreateCompetenceDto);

  const SavedCompetence = await newCompetence. save() as ICompetence;
const CandidatId = await this.CandidatModel.findById(CreateCompetenceDto.Candidat);
if (CandidatId ){

 CandidatId.Competence.push(SavedCompetence._id as mongoose.Types.ObjectId);
const savedCandidat = await CandidatId.save();
console. log(savedCandidat) ;
} else {
console. log("Candidat non trouvé")
 }
return SavedCompetence;

}



 // Liste des competence
 async list(): Promise<ICompetence[]> {
  return this.CompetenceModel.find().exec();
}
  
    // supprimier 
    async deleteCompetence(id:string):Promise<ICompetence>{
      const deleteCompetence=await this.CompetenceModel.findByIdAndDelete(id)
      if(!deleteCompetence){
        throw new NotFoundException(`Compétence avec ${id} n'été pas trouvé!`)
    }
      return deleteCompetence
    
    }
    
  
    // moudifier 
    async updateCompetence(id:string,UpdateCompetence:UpdateCompetenceDto):Promise<ICompetence>{
      const updateCompetence=await this.CompetenceModel.findByIdAndUpdate(id,UpdateCompetence,{new:true})
      if(!updateCompetence){
        throw new NotFoundException(`Compétence avec ${id} n'été pas modifié!`)
    }
      return updateCompetence
    
    }
    
  
  
    // get by id 
    async getbyId(id:string):Promise<ICompetence>{
      const getCompetence=await this.CompetenceModel.findById(id)
      if(!getCompetence){
        throw new NotFoundException(`Compétence avec ${id} n'été pas trouvé!`)
    }
      return getCompetence
    
    }


// Méthode delete pour supprimer une compétence
async supprimerCompetence(competenceId: string): Promise<ICompetence> {
  // Supprimer la compétence de la base de données
  const deleteData = await this.CompetenceModel.findByIdAndDelete(competenceId);
  if (!deleteData) {
    throw new NotFoundException(`La compétence avec l'id ${competenceId} est introuvable`);
  }

  // Mettre à jour le candidat en supprimant la compétence correspondante
  const updateCandidat = await this.CandidatModel.findById(deleteData.Candidat);
  if (updateCandidat) {
    // Retirer la compétence de la liste des compétences du candidat
    updateCandidat.Competence = updateCandidat.Competence.filter(
      (competence) => competence.toString() !== competenceId
    );
    await updateCandidat.save();
  } else {
    throw new NotFoundException(`Le candidat avec l'id ${deleteData.Candidat} est introuvable`);
  }

  return deleteData;
}

    }
