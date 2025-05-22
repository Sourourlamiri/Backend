import { Module } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidatSchema } from './entities/candidat.entity';
import { UtilisateurSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { EntretienSchema } from 'src/entretien/entities/entretien.entity';
import { ExpérienceSchema } from 'src/expérience/entities/expérience.entity';
import { FormationSchema } from 'src/formation/entities/formation.entity';
import { CetificationSchema } from 'src/certification/entities/certification.entity';
import { CompetenceSchema } from 'src/compétence/entities/compétence.entity';
import { OffreSchema } from 'src/offre/entities/offre.entity';
import { CandidatureSchema } from 'src/candidature/entities/candidature.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'utilisateur', schema: UtilisateurSchema },
      { name: 'entretien', schema: EntretienSchema },
      { name: 'Experience', schema: ExpérienceSchema },
      { name: 'Formation', schema: FormationSchema },
      { name: 'Certification', schema: CetificationSchema },
      { name: 'Competence', schema: CompetenceSchema },
      { name: 'Offre', schema: OffreSchema },
      { name: 'Candidature', schema: CandidatureSchema }
    ])
  ],
  controllers: [CandidatController],
  providers: [CandidatService],
})
export class CandidatModule {}
