import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvisDto } from './dto/create-avi.dto';
import { IAvis } from './Interface/Interface-Avis';
import mongoose, { Model } from 'mongoose';
import { IRecruteur } from 'src/recruteur/Interface/Interface-Recruteur';
import { InjectModel } from '@nestjs/mongoose';
import { ICandidat } from 'src/candidat/Interface/Interface-Candidat';
import { UpdateAvisDto } from './dto/update-avi.dto';

@Injectable()
export class AvisService {
 constructor(@InjectModel("Avis") private avisModel: Model<IAvis>,
    @InjectModel("utilisateur") private CandidatModel: Model<ICandidat>, @InjectModel("utilisateur") private RecruteurModel: Model<IRecruteur>) { }
 
async createAvis(CreateAvisDto: CreateAvisDto): Promise<IAvis> {
    // Ensure note is stored as a number
    const avisData = {
      ...CreateAvisDto,
      note: Number(CreateAvisDto.note),
    };
    const newAvis = new this.avisModel(avisData);
    const SavedAvis = await newAvis.save() as IAvis;

  // relation candidat et Avis
const CandidatId = await this.CandidatModel.findById(CreateAvisDto.Candidat);
    if (CandidatId) {
      if (!Array.isArray(CandidatId.Avis)) {
        CandidatId.Avis = [];
      }
 CandidatId.Avis.push(SavedAvis._id as mongoose.Types.ObjectId);
      await CandidatId.save();
} else {
      console.log("Candidat non trouvé");
 }

    // relation recruteur et Avis
 const RecruteurId = await this.RecruteurModel.findById(CreateAvisDto.Recruteur);
    if (RecruteurId) {
      if (!Array.isArray(RecruteurId.Avis)) {
        RecruteurId.Avis = [];
      }
 RecruteurId.Avis.push(SavedAvis._id as mongoose.Types.ObjectId);
      await RecruteurId.save();
} else {
      console.log("Recruteur non trouvé");
 }
return SavedAvis;
}

// Liste des avis
 async list(): Promise<IAvis[]> {
  return this.avisModel.find().exec();
}

// get by id 
  async getbyId(id: string): Promise<IAvis> {
    const getAvis = await this.avisModel.findById(id)
    if (!getAvis) {
        throw new NotFoundException(`Avis avec ${id} n'été pas trouvé!`)
    }
      return getAvis
  }

  // Get avis by recruteur id
  async getByRecruteur(recruteurId: string): Promise<IAvis[]> {
    return this.avisModel.find({
      Recruteur: recruteurId
    }).exec();
  }

  // Get avis by both recruteur id and candidat id
  async getByRecruteurAndCandidat(recruteurId: string, candidatId: string): Promise<IAvis[]> {
    return this.avisModel.find({
      Recruteur: recruteurId,
      Candidat: candidatId
    }).exec();
  }

  // Update avis
  async updateAvis(id: string, updateAvisDto: UpdateAvisDto): Promise<IAvis> {
    // Ensure note is stored as a number if it's provided
    const updateData = { ...updateAvisDto };
    if (updateData.note) {
      updateData.note = Number(updateData.note);
    }

    const updatedAvis = await this.avisModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedAvis) {
      throw new NotFoundException(`Avis avec ${id} n'été pas trouvé!`);
    }

    return updatedAvis;
  }

  // Delete avis
  async deleteAvis(id: string): Promise<IAvis> {
    const deletedAvis = await this.avisModel.findByIdAndDelete(id);

    if (!deletedAvis) {
      throw new NotFoundException(`Avis avec ${id} n'été pas trouvé!`);
    }

    // Remove reference from candidat
    if (deletedAvis.Candidat) {
      const candidat = await this.CandidatModel.findById(deletedAvis.Candidat);
      if (candidat && Array.isArray(candidat.Avis)) {
        candidat.Avis = candidat.Avis.filter(
          avisId => avisId.toString() !== id
        );
        await candidat.save();
      }
    }

    // Remove reference from recruteur
    if (deletedAvis.Recruteur) {
      const recruteur = await this.RecruteurModel.findById(deletedAvis.Recruteur);
      if (recruteur && Array.isArray(recruteur.Avis)) {
        recruteur.Avis = recruteur.Avis.filter(
          avisId => avisId.toString() !== id
        );
        await recruteur.save();
      }
    }

    return deletedAvis;
  }
}