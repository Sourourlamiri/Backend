import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ICertification } from './Interface/interface-certification';
import { ICandidat } from 'src/candidat/Interface/Interface-Candidat';

@Injectable()
export class CertificationService {

  constructor(
    @InjectModel("Certification") private CertificationModel: Model<ICertification>,
    @InjectModel("utilisateur") private CandidatModel: Model<ICandidat>
  ) {}

  
  /// créer Certification
  async createCertification(CreateCertificationDto: CreateCertificationDto): Promise<ICertification> {
  
    // relation candidat et Certification
    const newCertification=await new this.CertificationModel(CreateCertificationDto);
  
    const SavedCertification= await newCertification. save() as ICertification;
  const CandidatId = await this.CandidatModel.findById(CreateCertificationDto.Candidat);
  if (CandidatId ){
  
   CandidatId.Certification.push(SavedCertification._id as mongoose.Types.ObjectId);
  const savedCandidat = await CandidatId.save();
  console. log(savedCandidat) ;
  } else {
  console. log("Candidat non trouvé")
   }
  return SavedCertification;
  
  }



// list 
  async list(): Promise<ICertification[]> {
    return this.CertificationModel.find().exec();
  }


  // supprimier
  async deleteCertification(id: string): Promise<ICertification> {
    const deleteCertification = await this.CertificationModel.findByIdAndDelete(id);
    if (!deleteCertification) {
      throw new NotFoundException(`Certification avec l'ID ${id} n'a pas été trouvée!`);
    }
    return deleteCertification;
  }

  // modifier
  async updateCertification(id: string, updateCertification: UpdateCertificationDto): Promise<ICertification> {
    const updatedCertification = await this.CertificationModel.findByIdAndUpdate(id, updateCertification, { new: true });
    if (!updatedCertification) {
      throw new NotFoundException(`Certification avec l'ID ${id} n'a pas été modifiée!`);
    }
    return updatedCertification;
  }

  // getbyid
  async getById(id: string): Promise<ICertification> {
    const certification = await this.CertificationModel.findById(id);
    if (!certification) {
      throw new NotFoundException(`Certification avec l'ID ${id} n'a pas été trouvée!`);
    }
    return certification;
  }



  
// Méthode delete pour supprimer une certification
async supprimerCertification(certificationId: string): Promise<ICertification> {
  // Supprimer la certification de la base de données
  const deleteData = await this.CertificationModel.findByIdAndDelete(certificationId);
  if (!deleteData) {
    throw new NotFoundException(`La certification avec l'id ${certificationId} est introuvable`);
  }

  // Mettre à jour le candidat en supprimant la certification correspondante
  const updateCandidat = await this.CandidatModel.findById(deleteData.Candidat);
  if (updateCandidat) {
    // Retirer la certification de la liste des certifications du candidat
    updateCandidat.Certification = updateCandidat.Certification.filter(
      (certification) => certification.toString() !== certificationId
    );
    await updateCandidat.save();
  } else {
    throw new NotFoundException(`Le candidat avec l'id ${deleteData.Candidat} est introuvable`);
  }

  return deleteData;
}






}
