import { Module } from '@nestjs/common';
import { CategorieService } from './catégorie.service';
import { CategorieController } from './catégorie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categorieschema } from './entities/catégorie.entity';
import { OffreSchema } from 'src/offre/entities/offre.entity';
@Module({
  imports: [MongooseModule.forFeature([{ name: "Categorie", schema:Categorieschema },{ name: "Offre", schema:OffreSchema
   }])],
  controllers: [CategorieController],
  providers: [CategorieService],
})
export class CategorieModule {}
