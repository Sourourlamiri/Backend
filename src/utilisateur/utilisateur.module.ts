import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurSchema } from './entities/utilisateur.entity';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { AdministrateurSchema } from 'src/administrateur/entities/administrateur.entity';
import { CandidatSchema } from 'src/candidat/entities/candidat.entity';
import { RecruteurSchema } from 'src/recruteur/entities/recruteur.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"utilisateur",schema:UtilisateurSchema,discriminators:[{name:"administrateur",schema:AdministrateurSchema},{name:"candidat",schema:CandidatSchema},{name:"recruteur",schema:RecruteurSchema}]}])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports:[UtilisateurService]
})
export class UtilisateurModule {}
