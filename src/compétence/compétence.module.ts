import { Module } from '@nestjs/common';
import { CompetenceService } from './compétence.service';  
import { CompetenceController } from './compétence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompetenceSchema } from './entities/compétence.entity';
import { UtilisateurSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { CandidatSchema } from 'src/candidat/entities/candidat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Competence', schema: CompetenceSchema },
      { name: 'utilisateur', schema: CandidatSchema },
    ]),
  ],
  controllers: [CompetenceController],
  providers: [CompetenceService],
  exports: [MongooseModule],  
})
export class CompetenceModule {}