import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidatureDto } from './dto/create-candidature.dto';
import { UpdateCandidatureDto } from './dto/update-candidature.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ICandidature } from './Interface/interface-candidature';
import { IOffre } from 'src/offre/interface/interface-offre';
import { ICandidat } from 'src/candidat/Interface/Interface-Candidat';

@Injectable()
export class CandidatureService {
  constructor(@InjectModel("Candidature") private CandidatureModel: Model<ICandidature>,
    @InjectModel("Offre") private OffreModel: Model<IOffre>, @InjectModel("utilisateur") private utilisateurModel: Model<ICandidat>) { }
  // Créer un Candidature
  async createCandidature(CreateCandidatureDto: CreateCandidatureDto): Promise<ICandidature>

  // Création d'un nouvel Candidature
  {
    const newCandidature = await new this.CandidatureModel(CreateCandidatureDto);
    const saveCandidature = await newCandidature.save() as ICandidature;
    // relation entre Candidature et Offre
    //  // Recherche de l'Offre et du Candidat par leur ID
    const OffreId = await this.OffreModel.findById(CreateCandidatureDto.Offre)
    const CandidatId = await this.utilisateurModel.findById(CreateCandidatureDto.Candidat)
    if (OffreId) {

      // Ajout de l'ID de la Cadidature à la liste des Candidature de la Candidat
      OffreId.Candidature.push(saveCandidature._id as mongoose.Types.ObjectId)
      const saveOffre = await OffreId.save()
      console.log(saveOffre)
    }
    if (CandidatId) {

      // Ajoute l'ID de la Candidature (saveentretien._id) à la liste des Candidature  du Candidat
      CandidatId.Candidature.push(saveCandidature._id as mongoose.Types.ObjectId)
      // Enregistre les modifications dans la base de données
      const saveCandidat = await CandidatId.save()
      // Affiche le Candidat mis à jour dans la console pour vérification
      console.log(saveCandidat)
    }
    return saveCandidature
  }







  //list
  async list(): Promise<ICandidature[]> {
    const Candidature = await this.CandidatureModel.find()
    return Candidature

  }
  async deleteCandidature(id: string): Promise<ICandidature> {
    const deleteCandidature = await this.CandidatureModel.findByIdAndDelete(id)
    if (!deleteCandidature) {
      throw new NotFoundException(`Candidature avec ${id} n'été pas trouvé!`)
    }
    return deleteCandidature

  }

  //modifier
  async updateCandidature(id: string, UpdateCandidature: UpdateCandidatureDto): Promise<ICandidature> {
    const updateCandidature = await this.CandidatureModel.findByIdAndUpdate(id, UpdateCandidature, { new: true })
    if (!updateCandidature) {
      throw new NotFoundException(`candidature avec ${id} n'été pas modifié!`)
    }
    return updateCandidature

  }

  async getbyId(id: string): Promise<ICandidature> {
    const getCandidature = await this.CandidatureModel.findById(id)
    if (!getCandidature) {
      throw new NotFoundException(`candidature avec ${id} n'été pas trouvé!`)
    }
    return getCandidature

  }




  // Méthode delete pour supprimer une candidature
  async supprimerCandidature(candidatureId: string): Promise<ICandidature> {
    // Supprimer la candidature de la base de données
    const deleteData = await this.CandidatureModel.findByIdAndDelete(candidatureId);
    if (!deleteData) {
      throw new NotFoundException(`La candidature avec l'id ${candidatureId} est introuvable`);
    }

    // Mettre à jour l'offre en supprimant la candidature correspondante
    /*   const updateOffre = await this.OffreModel.findById(deleteData.Offre);
      if (updateOffre) {
        // Retirer la candidature de la liste des candidatures de l'offre
        updateOffre.Candidature = updateOffre.Candidature.filter(
          (candidature) => candidature.toString() !== candidatureId
        );
        await updateOffre.save();
      } else {
        throw new NotFoundException(`L'offre avec l'id ${deleteData.Offre} est introuvable`);
      } */

    return deleteData;
  }

  // Méthode pour compter le nombre total de candidatures
  async countCondidature(): Promise<number> {
    const count = await this.CandidatureModel.countDocuments();
    return count;
  }

  // Méthode pour compter le nombre de candidatures par statut
  async getCandidaturesParStatut() {
    return this.CandidatureModel.aggregate([
      {
        $group: {
          _id: "$statut",
          count: { $sum: 1 }
        }
      }
    ]);
  }

  // Méthode pour compter le nombre total de candidatures par statut 

  async getCandidaturesParRecruteur() {
    return this.CandidatureModel.aggregate([
      {
        $lookup: {
          from: "offres",
          localField: "Offre",
          foreignField: "_id",
          as: "offre"
        }
      },
      { $unwind: "$offre" },
      {
        $lookup: {
          from: "utilisateurs",
          localField: "offre.recruteur",
          foreignField: "_id",
          as: "recruteur"
        }
      },
      { $unwind: "$recruteur" },
      {
        $group: {
          _id: {
            recruteurId: "$recruteur._id",
            recruteurNom: "$recruteur.Nom",

            statut: "$statut"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            recruteurId: "$_id.recruteurId",
            recruteurNom: "$_id.recruteurNom",

          },
          stats: {
            $push: {
              statut: "$_id.statut",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          recruteur: {

            nom: "$_id.recruteurNom",

          },
          stats: 1
        }
      }
    ]);
  }


  async nbCandidatParRepartition() {
    const candidatures = await this.CandidatureModel.find().populate('Candidat')
    const count = new Map<string, number>()
    for (const candidature of candidatures) {
      for (const candidat of candidature.Candidat as any[]) {
        const localisation = candidat.Adresse
        if (localisation) {
          count.set(localisation, (count.get(localisation) || 0) + 1);
        }
      }

    }
    const result: Record<string, number> = {};
    for (const [localisation, total] of count.entries()) {
      result[localisation] = total;
    }

    return result;
  }
}
