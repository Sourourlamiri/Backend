import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntretienDto } from './dto/create-entretien.dto';
import { UpdateEntretienDto } from './dto/update-entretien.dto';
import { IEntretien } from './Interface/interface-entretien';
import mongoose, { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { IOffre } from 'src/offre/interface/interface-offre';
import { IRecruteur } from 'src/recruteur/Interface/Interface-Recruteur';
import { Recruteur } from 'src/recruteur/entities/recruteur.entity';
import { CreateOffreDto } from 'src/offre/dto/create-offre.dto';
import { Offre } from 'src/offre/entities/offre.entity';
import { ICandidat } from 'src/candidat/Interface/Interface-Candidat';

@Injectable()
export class EntretienService {

  constructor(
      @InjectModel('entretien') private readonly EntretienModel: Model<IEntretien>,
      @InjectModel("Offre") private OffreModel: Model<IOffre>,
      @InjectModel("utilisateur") private recruteurModel: Model<IRecruteur>,
      @InjectModel("utilisateur") private candidatModel: Model<ICandidat>
    ) {}

    @Cron('*/1 * * * *')
    async handleCron() {
      const now = new Date();
      const result = await this.EntretienModel.deleteMany({ dateFin: { $lte: now } });
    
      if (result.deletedCount > 0) {
        console.log(`${result.deletedCount} entretien(s) supprimé(s)`);
      } else {
        console.log('Aucun entretien trouvé à supprimer.');
      }
    }



    
    
    // Créer un entretien
     async createEntretien(CreateEnretienDto:CreateEntretienDto):Promise<IEntretien> 

    // Création d'un nouvel entretien
         {const newEnretien =await new this.EntretienModel(CreateEnretienDto);
      const saveEnretien= await newEnretien.save() as IEntretien;

      //  // Recherche de l'Offre et du Recruteur par leur ID
      const OffreId= await this.OffreModel.findById(CreateEnretienDto.Offre)
      const RecruteurId= await this.recruteurModel.findById(CreateEnretienDto.Recruteur)
      const CandidatId= await this.candidatModel.findById(CreateEnretienDto.Candidat)

      if(OffreId){


          // Ajout de l'ID de la entretien à la liste des enretien de la recruteur
        OffreId.entretien.push(saveEnretien._id as mongoose.Types.ObjectId)
        const saveOffre = await OffreId.save()
        console.log(saveOffre)
      }
      if(RecruteurId){
        
        // Ajoute l'ID de la entretien (saveentretien._id) à la liste des enretien du recruteur
        RecruteurId.entretien.push(saveEnretien._id as mongoose.Types.ObjectId)
        // Enregistre les modifications dans la base de données
        const saveRecruteur =await RecruteurId.save()
        // Affiche le recruteur mis à jour dans la console pour vérification
        console.log(saveRecruteur)
      }

      if(CandidatId){
        
        // Ajoute l'ID de la entretien (saveentretien._id) à la liste des enretien du candidat
        CandidatId.entretien.push(saveEnretien._id as mongoose.Types.ObjectId)
        // Enregistre les modifications dans la base de données
        const saveCandidat =await CandidatId.save()
        // Affiche le candidat mis à jour dans la console pour vérification
        console.log(saveCandidat)
      }
     return saveEnretien 

     }

 
   


    


  


// liste 
    async list():Promise<IEntretien[]>{
      const Entretien=await this.EntretienModel.find()
      return Entretien
    
    }





    
    // modifier enretien 
    async updateEntretien(id:string,UpdateEntretien:UpdateEntretienDto):Promise<IEntretien>{
      const updateEntretien=await this.EntretienModel.findByIdAndUpdate(id,UpdateEntretien,{new:true})
      if(!updateEntretien){
        throw new NotFoundException(`Entretien avec ${id} n'été pas trouvé!`)
    }
      return updateEntretien
    
    }



    // get by id 
  async getbyId(id: string): Promise<IEntretien> {
    const getEntretien = await this.EntretienModel.findById(id);
    if (!getEntretien) {
      throw new NotFoundException(`Entretien avec ${id} n'a pas été trouvé!`);
    }
    return getEntretien;
  }




//Delete entretien
  // Méthode pour supprimer un entretien par son ID
async deleteEntretien(id: string): Promise<IEntretien> {
  const deleteEntretien = await this.EntretienModel.findByIdAndDelete(id).exec();
  if (!deleteEntretien) {
    throw new NotFoundException(`Entretien avec ${id} n'a pas été trouvé!`);
  }
return deleteEntretien;
}




  // Méthode pour supprimer un entretien de la base de données et mettre à jour les références dans l'offre et le recruteur
async supprimerEntretien(entretienId: string): Promise<IEntretien> {
  // Supprimer l'entretien de la base de données
  const deleteData = await this.EntretienModel.findByIdAndDelete(entretienId);
  if (!deleteData) {
    throw new NotFoundException(`L'entretien avec l'id ${entretienId} est introuvable`);
  }

  // Mettre à jour l'offre en supprimant l'entretien correspondant
  const updateOffre = await this.OffreModel.findById(deleteData.Offre);
  if (updateOffre) {
    // Retirer l'entretien de la liste des entretiens de l'offre
    updateOffre.entretien = updateOffre.entretien.filter(
      (entretien) => entretien.toString() !== entretienId
    );
    await updateOffre.save();
  } else {
    throw new NotFoundException(`L'offre avec l'id ${deleteData.Offre} est introuvable`);
  }



  // Mettre à jour le recruteur en supprimant l'entretien de la liste
  const updateRecruteur = await this.recruteurModel.findById(deleteData.Recruteur);
  if (updateRecruteur) {
    // Retirer l'entretien de la liste des entretiens du recruteur
    updateRecruteur.entretien = updateRecruteur.entretien.filter(
      (entretien) => entretien.toString() !== entretienId
    );
    await updateRecruteur.save();
  } else {
    throw new NotFoundException(`Le recruteur avec l'id ${deleteData.Recruteur} est introuvable`);
  }

  return deleteData;
}

// Get entretiens by candidat ID
async getEntretiensByCandidat(candidatId: string): Promise<IEntretien[]> {
  try {
    // Find all interviews where the Candidat field matches the provided candidatId
    const entretiens = await this.EntretienModel.find({ Candidat: candidatId })
      .populate('Offre') // Populate the Offre field to get more information
      .populate('Recruteur'); // Populate the Recruteur field to get more information
    
    if (!entretiens || entretiens.length === 0) {
      throw new NotFoundException(`Aucun entretien trouvé pour le candidat ${candidatId}`);
    }
    
    return entretiens;
  } catch (error) {
    throw new BadRequestException(`Erreur lors de la récupération des entretiens: ${error.message}`);
  }
}

}