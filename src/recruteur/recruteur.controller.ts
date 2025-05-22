import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, NotFoundException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RecruteurService } from './recruteur.service';
import { CreateRecruteurDto } from './dto/create-recruteur.dto';
import { UpdateRecruteurDto } from './dto/update-recruteur.dto';
import { IRecruteur } from './Interface/Interface-Recruteur';


@Controller('recruteur')
export class RecruteurController {
  constructor(private readonly recruteurService: RecruteurService) {}

  // Route pour créer un recruteur avec l'upload d'une image
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './storage', // Destination où les images seront stockées
      filename: (req, file, cb) => {
        // Création du nom du fichier avec un timestamp pour éviter les collisions
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
      }
    })
  }))
  @Post()
  async createRecruteur(@Res() response, @Body() CreateRecruteurDto: CreateRecruteurDto, @UploadedFile() file: any) {
    try {
      // Vérification et ajout du nom du fichier image à CreateRecruteurDto
      CreateRecruteurDto.image = file ? file.filename : null; 
      const newRecruteur = await this.recruteurService.createRecruteur(CreateRecruteurDto);
      return response.status(HttpStatus.CREATED).json({
        message: `Recruteur a été écrit avec succès!`,
        newRecruteur
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `La création du recruteur a échoué!` + error
      });
    }
  }

  // Route pour récupérer la liste des recruteurs
  @Get()
  async list(@Res() response) {
    try {
      const list = await this.recruteurService.list();
      return response.status(HttpStatus.OK).json({
        message: `Liste des recruteurs!`,
        list
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Liste des recruteurs introuvable!`
      });
    }
  }

  // Route pour supprimer un recruteur
  @Delete('/:id')
  async deleteRecruteur(@Res() response, @Param('id') RecruteurId: string) {
    try {
      const RecruteurDelete = await this.recruteurService.deleteRecruteur(RecruteurId);
      return response.status(HttpStatus.OK).json({
        message: `Recruteur a été supprimé!`,
        RecruteurDelete
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Recruteur n'a pas été supprimé!` + error
      });
    }
  }

  // Route pour mettre à jour un recruteur avec l'upload d'une nouvelle image
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './storage', // Destination où les images seront stockées
      filename: (req, file, cb) => {
        // Création du nom du fichier avec un timestamp pour éviter les collisions
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
      }
    })
  }))
  @Put('/:id')
  async updateRecruteur(@Res() response, @Param('id') RecruteurId: string, @Body() updateRecruteur: UpdateRecruteurDto, @UploadedFile() file: any) {
    try {
      // Si une nouvelle image est téléchargée, on l'ajoute à la requête
      updateRecruteur.image = file ? file.filename : null;
      const DataUpdate = await this.recruteurService.updateRecruteur(RecruteurId, updateRecruteur);
      return response.status(HttpStatus.OK).json({
        message: "Les informations ont été mises à jour",
        DataUpdate
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Erreur lors de la mise à jour des informations : " + error.message
      });
    }
  }

  // Route pour récupérer un recruteur par son ID
  @Get('/:id')
  async getbyId(@Res() response, @Param('id') RecruteurId: string) {
    try {
      const getRecruteur = await this.recruteurService.getbyId(RecruteurId);

//
// Si l'ID du recruteur est trouvé, on récupère ses offres et on les associe avec le statut 'ouvert'
const offresAvecStatut = getRecruteur.Offre?.map(offre => ({
  offre,
  statut: 'ouvert'
})) || [];


      return response.status(HttpStatus.OK).json({
        message: `Recruteur avec l'ID '${RecruteurId}' a été trouvé!`,
        getRecruteur
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Recruteur avec l'ID '${RecruteurId}' n'a pas été trouvé!` + error
      });
    }
  }




  // Route pour activer un recruteur
  @Patch('activer/:id')
  async activercompte(@Param('id') id: string): Promise<IRecruteur> {
    const recruteur = await this.recruteurService.activer(id);
    if (!recruteur) {
      throw new NotFoundException(`Le recruteur avec l'ID ${id} n'existe pas.`);
    }
    return recruteur;
  }

  // Route pour désactiver un recruteur
  @Patch(':id/desactiver')
  async desactivercompte(@Param('id') id: string): Promise<IRecruteur> {
    const recruteur = await this.recruteurService.desactiver(id);
    if (!recruteur) {
      throw new NotFoundException(`Le recruteur avec l'ID ${id} n'existe pas.`);
    }
    return recruteur;
  }

  // Route pour obtenir le nombre total de recruteurs
  @Get('/stat/total')
  async getrecruteursCount(): Promise<{ total: number }> {
    const total = await this.recruteurService.countRecruteurs();
    return { total };
  }


  // Méthode pour compter le nombre total de postes disponibles par chaque recruteur
  @Get('/stat/nbPosteDispo')
  async nbPosteDispo(){
    return this.recruteurService.nbPosteDispo();
  }

}
