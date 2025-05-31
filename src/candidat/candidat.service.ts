import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import { ICandidat } from './Interface/Interface-Candidat';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import* as crypto from 'crypto';
import { IUtilisateur } from 'src/utilisateur/Interface/Interface-Utilisateur';
import * as argon2 from 'argon2';

@Injectable()
export class CandidatService {
constructor(@InjectModel("utilisateur") private CandidatModel:Model<ICandidat>,private mailerservice:MailerService){}
hashData(data: string) {
  return argon2.hash(data);
}


async generatCode():Promise<string>{
    return crypto.randomBytes(3).toString('hex').toUpperCase();
  }

// methode create candidat 

async createCandidat(CreateCandidatDto:CreateCandidatDto):Promise<ICandidat>{
  const hashedPassword=await this.hashData(CreateCandidatDto.MotDePasse)

  
  const code =await this .generatCode()
  const mailoptions={
    to:CreateCandidatDto.Email,
    Subject:'verification de votre adresse email',
    text:`votre code de vérification est : ${code}`,
   html: `<p> votre code de vérification est :<strong><a href="${process.env.BACKEND_URL}/utilisateur/verify/${code}">${code}</a></strong></p>`,
  };
    await this.mailerservice.sendMail(mailoptions);
      const newCandidat=await new this.CandidatModel({...CreateCandidatDto,code:code,MotDePasse:hashedPassword})
      return  await newCandidat.save()
    }


    //get list candidat
async list():Promise<ICandidat[]>{
    const Candidat=await this.CandidatModel.find({role:"candidat"})
    return Candidat
  
  }






async deleteCandidat(id:string):Promise<ICandidat>{
  const deleteCandidat=await this.CandidatModel.findByIdAndDelete(id)
  if(!deleteCandidat){
    throw new NotFoundException(`candidat avec ${id} n'été pas trouvé!`)
}
  return deleteCandidat

}







async updateCandidat(id:string,updatecandidat:UpdateCandidatDto):Promise<ICandidat>{
  const updateCandidat=await this.CandidatModel.findByIdAndUpdate(id,updatecandidat,{new:true})
  if(!updateCandidat){
    throw new NotFoundException(`candidat avec ${id} n'été pas modifié!`)
}
  return updateCandidat

}





async getbyId(id: string): Promise<ICandidat> {
  const getCandidat = await this.CandidatModel.findById(id)
    .populate([
      {
        path: 'Candidature',
        populate: {
          path: 'Offre',
          model: 'Offre',
          options: { strictPopulate: false }
        }
      },
      { path: 'Formation' },
      { path: 'Experience' },
      { path: 'Certification' },
      { path: 'Competence' }
    ]);

  if (!getCandidat) {
    throw new NotFoundException(`Candidat avec l'ID ${id} n'a pas été trouvé!`);
  }

  return getCandidat;
}




// Méthode pour compter le nombre total de candidats
async countCandidats(): Promise<number> {
  const count = await this.CandidatModel.countDocuments({ role: 'candidat' });
    return count;
  }


  // repartition géographique des candidats
  async getRepartitionGeographique(): Promise<{ [key: string]: number }> {
    // Agrégation MongoDB pour compter les candidats par région
    const resultats = await this.CandidatModel.aggregate([
      { 
        $match: { role: "candidat" } // On ne prend que les candidats
      },
      {
        $group: {
          _id: "$Adresse", // Groupement par adresse
          nombre: { $sum: 1 } // Comptage par région
        }
      },
      {
        $project: {
          _id: 0, // On exclut l'id
          region: "$_id", // On renomme en 'region'
          nombre: 1 // On conserve le comptage
        }
      }
    ]);
  
    // Traduction des noms de régions
    const repartition = {};
    resultats.forEach(item => {
      const regionsTraduites = {
        "Tunis": "Tunis",
        "Sfax": "Sfax", 
        "Sousse": "Sousse",
        "Kairouan": "Kairouan",
        "Bizerte": "Bizerte",
        "Gabes": "Gabès",
        "Ariana": "Ariana",
        "Gafsa": "Gafsa",
        "Monastir": "Monastir",
        "Nabeul": "Nabeul",
        "Tataouine": "Tataouine",
        "Tozeur": "Tozeur",
        "Zaghouan": "Zaghouane"
      };
  
      const region = regionsTraduites[item.region] || item.region;
      repartition[region] = item.nombre;
    });
  
    return repartition;
  }
}
