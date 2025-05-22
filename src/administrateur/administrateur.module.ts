import { Module } from '@nestjs/common';
import { AdministrateurService } from './administrateur.service';
import { AdministrateurController } from './administrateur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilisateurSchema } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"utilisateur",schema:UtilisateurSchema}])],
  controllers: [AdministrateurController],
  providers: [AdministrateurService],
})
export class AdministrateurModule {}
