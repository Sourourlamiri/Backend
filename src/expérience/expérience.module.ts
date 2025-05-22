import { Module } from '@nestjs/common';
import { ExpérienceService } from './expérience.service';
import { ExpérienceController } from './expérience.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpérienceSchema } from './entities/expérience.entity';
import { UtilisateurSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { CandidatSchema } from 'src/candidat/entities/candidat.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"Experience",schema:ExpérienceSchema},{name:"utilisateur",schema: CandidatSchema}])],
  controllers: [ExpérienceController],
  providers: [ExpérienceService],
})
export class ExpérienceModule {}
