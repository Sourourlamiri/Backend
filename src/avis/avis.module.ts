import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvisService } from './avis.service';
import { AvisController } from './avis.controller';
import { AvisSchema } from './entities/avi.entity';
import { CandidatSchema } from 'src/candidat/entities/candidat.entity';
import { RecruteurSchema } from 'src/recruteur/entities/recruteur.entity';


  
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Avis', schema: AvisSchema},{ name: 'utilisateur', schema: CandidatSchema },{ name: 'utilisateur', schema: RecruteurSchema }]),
  ],
  controllers: [AvisController],
  providers: [AvisService],
})
export class AvisModule {}