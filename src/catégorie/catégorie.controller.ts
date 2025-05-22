import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { CategorieService } from './catégorie.service';
import { CreateCategorieDto } from './dto/create-catégorie.dto';
import { UpdateCategorieDto } from './dto/update-catégorie.dto';

@Controller('Categorie')  
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  async createCategorie(@Res() response, @Body() createCategorieDto: CreateCategorieDto) {
    try {
      const newCategorie = await this.categorieService.createCategorie(createCategorieDto);
      return response.status(HttpStatus.CREATED).json({
        message: `Catégorie créée avec succès!`,
        newCategorie,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur lors de la création de la catégorie!`,
      });
    }
  }

  @Get()
  async list(@Res() response) {
    try {
      const list = await this.categorieService.list();
      return response.status(HttpStatus.OK).json({
        message: `Liste des catégories!`,
        list,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Liste des catégories introuvable!`,
      });
    }
  }

  @Delete('/:id')
  async deleteCategorie(@Res() response, @Param('id') categorieId: string) {
    try {
      const categorieDelete = await this.categorieService.deleteCategorie(categorieId);
      return response.status(HttpStatus.OK).json({
        message: `Catégorie supprimée avec succès!`,
        categorieDelete,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur lors de la suppression de la catégorie!`,
      });
    }
  }

  @Put('/:id')
  async updateCategorie(@Res() response, @Param('id') categorieId: string, @Body() updateCategorie: UpdateCategorieDto) {
    try {
      const categorieUpdate = await this.categorieService.updateCategorie(categorieId, updateCategorie);
      return response.status(HttpStatus.OK).json({
        message: `Catégorie mise à jour avec succès!`,
        categorieUpdate,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur lors de la mise à jour de la catégorie!`,
      });
    }
  }

  @Get('/:id')
  async getById(@Res() response, @Param('id') categorieId: string) {
    try {
      const getCategorie = await this.categorieService.getbyId(categorieId);
      return response.status(HttpStatus.OK).json({
        message: `Catégorie trouvée avec succès!`,
        getCategorie,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Catégorie introuvable!`,
      });
    }
  }
}
