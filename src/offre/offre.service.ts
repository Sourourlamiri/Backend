import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { IOffre } from './interface/interface-offre';
import { IRecruteur } from 'src/recruteur/Interface/Interface-Recruteur';
import { ICandidat } from 'src/candidat/Interface/Interface-Candidat';
import { ICandidature } from 'src/candidature/Interface/interface-candidature';
import path from 'path';
import { ICategorie } from 'src/catégorie/Interface/interface-catégorie';

@Injectable()
export class OffreService {
  CandidatureModel: any;
  constructor(
    @InjectModel('Offre') private readonly OffreModel: Model<IOffre>,
    @InjectModel("utilisateur") private recruteurModel: Model<IRecruteur>,
    @InjectModel("Candidature") private candidatureModel: Model<ICandidature>,
    @InjectModel('Categorie') private categorieModel: Model<ICategorie>,
  ) {}

    // Créer un Offre
     async createOffre(CreateOffreDto:CreateOffreDto):Promise<IOffre> 

    // Création d'un nouvel Offre
         {const newOffre =await new this.OffreModel(CreateOffreDto);
      const saveOffre= await newOffre.save() as IOffre;

      //  // Recherche de candidat et du Recruteur par leur ID
      //const CandidatId= await this.CandidatModel.findById(CreateOffreDto.Candidat).exec();
      const RecruteurId= await this.recruteurModel.findById(CreateOffreDto.recruteur).exec();
      if(RecruteurId){
          // Ajout de l'ID de la entretien à la liste des enretien de la recruteur
          RecruteurId.Offre.push(saveOffre._id as mongoose.Types.ObjectId)
        const saveRecruteur = await RecruteurId.save()
        console.log(saveRecruteur)
      }else{
        console.log('Recruteur introuvable')
      }

       // 🔹 Vérification et lien avec la catégorie
    const CategorieId= await this.categorieModel.findById(CreateOffreDto.Categorie).exec();
    if (CategorieId) {
      CategorieId.Offre.push(saveOffre._id as mongoose.Types.ObjectId)
        const saveCategorie= await CategorieId.save()
        console.log(saveCategorie)
      }else{
        console.log('Categorie introuvable')
      }
    




      //candidat et offre
    /*   if(RecruteurId){
        
        // Ajoute l'ID de la Offre (saveOffre._id) à la liste des Offre du recruteur
        RecruteurId.entretien.push(saveOffre._id as mongoose.Types.ObjectId)
        // Enregistre les modifications dans la base de données
        const saveRecruteur =await RecruteurId.save()
        // Affiche le recruteur mis à jour dans la console pour vérification
        console.log(saveRecruteur)
      } */
     return saveOffre
     }
  


  // Lister toutes les offres
     async list(): Promise<IOffre[]> {
      const offres = await this.OffreModel.find().lean().exec(); 
      const formattedOffres = offres.map(offre => ({
        ...offre,
        statut: offre.statut || 'ouvert',  
      }));
    
      return formattedOffres;
    }

    
  // Supprimer une offre
async deleteOffre(id: string): Promise<IOffre> {
  // 1. D'abord récupérer l'offre pour vérifier les candidatures
  const offre = await this.OffreModel.findById(id).exec();
  
  if (!offre) {
    throw new NotFoundException(`Offre avec l'ID ${id} n'a pas été trouvé!`);
  }

    // 2. Vérifier s'il y a des candidatures liées à cette offre tayyy
    if (offre.Candidature && offre.Candidature.length > 0) {
      throw new BadRequestException(`Impossible de supprimer cette offre car elle a ${offre.Candidature.length} candidature(s) associée(s).`);
    }


  // 3. Si pas de candidatures, procéder à la suppression
  const deleteOffre = await this.OffreModel.findByIdAndDelete(id).exec();
  if (!deleteOffre) {
    throw new NotFoundException(`Offre avec l'ID ${id} n'a pas été trouvé!`);
  }
    // 3. Nettoyer la référence de l'offre chez le recruteur
  if (offre.recruteur) {
    const recruteur = await this.recruteurModel.findById(offre.recruteur).exec();
    if (recruteur) {
      recruteur.Offre = recruteur.Offre.filter(offreId => offreId.toString() !== id);
      await recruteur.save();
    }
  }
  return deleteOffre;
}




  // modifier
  async updateOffre(id: string, updateOffre: UpdateOffreDto): Promise<IOffre> {
    const updatedOffre = await this.OffreModel.findByIdAndUpdate(id, updateOffre, { new: true }).exec();
    if (!updatedOffre) {
      throw new NotFoundException(`Offre avec l'ID ${id} n'a pas été trouvé!`);
    }
    return updatedOffre;
  }

  // getbyid
  async getById(id: string): Promise<IOffre> {
    const offre = await this.OffreModel.findById(id)
      .populate([
        {
          path: 'Candidature',
          populate: {
            path: 'Candidat',
          },
        },
        {
          path: 'recruteur', // 💡 Popule aussi le recruteur
        },
        {
          path: 'Categorie', // 💡 Popule aussi le Categorie
        },
      ])
      .exec();
  
    if (!offre) {
      throw new NotFoundException(`Offre avec l'ID ${id} n'a pas été trouvé!`);
    }
    return offre;
  }
  


  

// Désactiver une offre (mettre à statut "ouvert")
async desactiverOffre(id: string): Promise<IOffre> {
  if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`ID invalide : ${id}`);
  }

  const offre = await this.OffreModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: { statut: "ouvert" } }, // Changer le statut à "ouvert"
      { new: true, runValidators: true }
  );

  if (!offre) {
      throw new NotFoundException(`Offre avec l'ID ${id} introuvable`);
  }

  console.log(`Offre ${id} mise à statut "ouvert" avec succès.`);
  return offre;
}

// Activer une offre (mettre à statut "statut")
async activerOffre(id: string): Promise<IOffre> {
  if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`ID invalide : ${id}`);
  }

  const offre = await this.OffreModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: { statut: "statut" } }, // Mettre à jour le statut
      { new: true, runValidators: true }
  );

  if (!offre) {
      throw new NotFoundException(`Offre avec l'ID ${id} introuvable`);
  }

  console.log(`Offre ${id} mise à statut "statut" avec succès.`);
  return offre;
}

// async supprimerOffre(offreId: string): Promise<IOffre> {
//   // Chercher l'offre
//   const offre = await this.OffreModel.findById(offreId).exec();
//   if (!offre) {
//     throw new NotFoundException(`Offre avec l'ID ${offreId} est introuvable`);
//   }

//   // Chercher si des candidatures existent pour cette offre
//   const candidatures = await this.CandidatureModel.find({ offre: offreId }).exec();
//   if (candidatures.length > 0) {
//     throw new BadRequestException(`Impossible de supprimer : des candidats ont déjà postulé.`);
//   }

//   // Supprimer l'offre
//   await this.OffreModel.findByIdAndDelete(offreId).exec();

//   // Supprimer la référence de l'offre chez le recruteur
//   const recruteur = await this.recruteurModel.findById(offre.recruteur).exec();
//   if (recruteur) {
//     recruteur.Offre = recruteur.Offre.filter(id => id.toString() !== offreId);
//     await recruteur.save();
//   }

//   return offre;
// }










async getCandidatsForOffre(offreId: string) {
  // Chercher toutes les candidatures pour cette offre
  const candidatures = await this.candidatureModel
    .find({ offre: offreId })
    .populate('Candidature') // Peupler les données du candidat
    .exec();
  if (candidatures.length === 0) {
    throw new NotFoundException("Aucun candidat trouvé pour cette offre");
  }
  return candidatures;
}


// Méthode pour compter le nombre total d' offres
async countOffres(): Promise<number> {
  const count = await this.OffreModel.countDocuments();
    return count;
  }


  // Méthode pour compter le nombre de candidature par poste
async nbCandidaturesParOffre(): Promise<any[]> {
  const offers = await this.OffreModel.find();
    return offers.map(offre=>{
      console.log('Titre:', offre.titre);
      console.log('Titre:', offre.Candidature.length);
      return{
        titre:offre.titre,
        nbCandidatures:offre.Candidature.length}
      });

 
    } }
