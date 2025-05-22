import { Module } from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { CandidatureController } from './candidature.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidatureSchema } from './entities/candidature.entity';
import { OffreModule } from 'src/offre/offre.module';  
import { OffreSchema } from 'src/offre/entities/offre.entity';
import { UtilisateurSchema } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Candidature', schema: CandidatureSchema },{ name: 'Offre', schema: OffreSchema },{ name: 'utilisateur', schema: UtilisateurSchema }])],

  controllers: [CandidatureController],
  providers: [CandidatureService],
})
export class CandidatureModule {}

