import { Module } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CetificationSchema} from './entities/certification.entity';
import { UtilisateurSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { CandidatSchema } from 'src/candidat/entities/candidat.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"Certification",schema:CetificationSchema},{name:"utilisateur",schema: CandidatSchema }])],
  controllers: [CertificationController],
  providers: [CertificationService],
})
export class CertificationModule {}
