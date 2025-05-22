import { Module } from '@nestjs/common';
import { OffreService } from './offre.service';
import { OffreController } from './offre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OffreSchema } from './entities/offre.entity';
import { UtilisateurSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { EntretienSchema } from 'src/entretien/entities/entretien.entity';
import { CandidatSchema } from 'src/candidat/entities/candidat.entity';
import { RecruteurSchema } from 'src/recruteur/entities/recruteur.entity'; 
import { CandidatureSchema} from 'src/candidature/entities/candidature.entity'; 
import { Categorieschema } from 'src/catégorie/entities/catégorie.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Offre', schema: OffreSchema },
      { name: 'utilisateur', schema: UtilisateurSchema },
      { name: 'entretien', schema: EntretienSchema },
      { name: 'utilisateur', schema: CandidatSchema },
      { name: 'utilisateur', schema: RecruteurSchema },
      { name: 'Candidature', schema: CandidatureSchema },
      { name: 'Categorie', schema: Categorieschema }
    ])
  ],
  controllers: [OffreController],
  providers: [OffreService],
  exports: [MongooseModule],
})
export class OffreModule {}
