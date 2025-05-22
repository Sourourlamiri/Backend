import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormationSchema } from './entities/formation.entity';
import { UtilisateurSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { CandidatSchema } from 'src/candidat/entities/candidat.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"Formation",schema:FormationSchema},{name:"utilisateur",schema: CandidatSchema}])],
  controllers: [FormationController],
  providers: [FormationService],
  exports: [MongooseModule],
})
export class FormationModule {}