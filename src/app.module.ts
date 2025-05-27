import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { RecruteurModule } from './recruteur/recruteur.module';
import { CandidatModule } from './candidat/candidat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministrateurModule } from './administrateur/administrateur.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OffreModule } from './offre/offre.module';
import { EntretienModule } from './entretien/entretien.module';

import { CertificationModule } from './certification/certification.module';
import { FormationModule } from './formation/formation.module';
import { ExpérienceModule } from './expérience/expérience.module';

import { CandidatureModule } from './candidature/candidature.module';
import { CategorieModule } from './catégorie/catégorie.module';
import { CompetenceModule } from './compétence/compétence.module';
import { PaymentModule } from './payment/payment.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AvisModule } from './avis/avis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', }),
    MongooseModule.forRoot(process.env.DATABASE_URL!),
  
    UtilisateurModule,
    RecruteurModule,
    CandidatModule,
    AdministrateurModule,
    AuthModule,
    OffreModule,
    EntretienModule,
    CategorieModule,
    CompetenceModule,
    CertificationModule,
    FormationModule,
    ExpérienceModule,
    CandidatureModule,
    PaymentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AvisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
