import { Module } from '@nestjs/common';
import { RecruteurService } from './recruteur.service';
import { RecruteurController } from './recruteur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilisateurSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { OffreSchema } from 'src/offre/entities/offre.entity'; 
import { EntretienSchema } from 'src/entretien/entities/entretien.entity'; 
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'utilisateur', schema: UtilisateurSchema },
      { name: 'offre', schema: OffreSchema },
      { name: 'entretien', schema: EntretienSchema }
    ])
  ],
  controllers: [RecruteurController],
  providers: [RecruteurService],
})
export class RecruteurModule {}

