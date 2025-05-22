import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntretienService } from './entretien.service';
import { EntretienController } from './entretien.controller';
import { EntretienSchema } from './entities/entretien.entity';
import { OffreSchema } from '../offre/entities/offre.entity';
import { CandidatSchema } from '../candidat/entities/candidat.entity'; 
import { RecruteurSchema } from '../recruteur/entities/recruteur.entity'; 
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // Import MongooseModule with the schemas for Entretien, Offre, Candidat, and Recruteur
    MongooseModule.forFeature([
      { name: 'entretien', schema: EntretienSchema },
      { name: 'Offre', schema: OffreSchema },
      { name: 'utilisateur', schema: CandidatSchema }, 
      { name: 'utilisateur', schema: RecruteurSchema } 
    ])
  ],
  controllers: [EntretienController],
  providers: [EntretienService],
  exports: [EntretienService],
})
export class EntretienModule {}

