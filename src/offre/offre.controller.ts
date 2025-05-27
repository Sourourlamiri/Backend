import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, NotFoundException 
} from '@nestjs/common';
import { OffreService } from './offre.service';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';
import { IOffre } from './interface/interface-offre';
import { Response } from 'express'; // Importé pour typer 'response'

@Controller('Offre')
export class OffreController {
  constructor(private readonly offreService: OffreService) {}

  // Créer une nouvelle offre
  @Post()
  async createOffre(@Res() response: Response, @Body() createOffreDto: CreateOffreDto) {
    try {
      const newOffre = await this.offreService.createOffre(createOffreDto);
      return response.status(HttpStatus.CREATED).json({
        message: `Offre créée avec succès !`,
        newOffre,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Échec de la création de l'offre !`,
        error: error.message,
      });
    }
  }

  // Lister toutes les offres
  @Get()
async list(@Res() response: Response) {
  try {
    const offres = await this.offreService.list();
    const formattedOffres = offres.map(offre => ({
      ...(typeof offre.toObject === 'function' ? offre.toObject() : offre),
      statut: offre.statut || 'ouvert',  
    }));
    return response.status(HttpStatus.OK).json({
      message: `Liste des offres récupérée avec succès !`,
      list: formattedOffres,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: `Échec de la récupération de la liste des offres.`,
      error: error.message,
    });
  }
}


  // Récupérer une offre par ID
  @Get('/:id')
  async getById(@Res() response: Response, @Param('id') offreId: string) {
    try {
      const getOffre = await this.offreService.getById(offreId);
      return response.status(HttpStatus.OK).json({
        message: `Offre avec l'ID '${offreId}' trouvée !`,
        getOffre: {
          ...(typeof getOffre.toObject === 'function' ? getOffre.toObject() : getOffre),
          statut: getOffre.statut || 'ouvert',
        },
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Offre avec l'ID '${offreId}' introuvable.`,
        error: error.message,
      });
    }
  }

  // Supprimer une offre
  @Delete('/:id')
  async deleteOffre(@Res() response: Response, @Param('id') offreId: string) {
    try {
      const offreDelete = await this.offreService.deleteOffre(offreId);
      return response.status(HttpStatus.OK).json({
        message: `Offre supprimée avec succès !`,
        offreDelete,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Échec de la suppression de l'offre.`,
        error: error.message,
      });
    }
  }

  // Mettre à jour une offre
  @Put('/:id')
  async updateOffre(
    @Res() response: Response, 
    @Param('id') offreId: string, 
    @Body() updateOffreDto: UpdateOffreDto
  ) {
    try {
      const offreUpdate = await this.offreService.updateOffre(offreId, updateOffreDto);
      return response.status(HttpStatus.OK).json({
        message: `Offre mise à jour avec succès !`,
        offreUpdate,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Échec de la mise à jour de l'offre.`,
        error: error.message,
      });
    }
  }

  // Activer une offre
  @Patch('/:id/activer')
  async activerOffre(@Res() response: Response, @Param('id') id: string) {
    try {
      const offre = await this.offreService.activerOffre(id);
      if (!offre) {
        throw new NotFoundException(`L'offre avec l'ID ${id} n'existe pas.`);
      }
      return response.status(HttpStatus.OK).json({
        message: `Offre activée avec succès.`,
        offre,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

  // Désactiver une offre
  @Patch('/:id/desactiver')
  async desactiverOffre(@Res() response: Response, @Param('id') id: string) {
    try {
      const offre = await this.offreService.desactiverOffre(id);
      if (!offre) {
        throw new NotFoundException(`L'offre avec l'ID ${id} n'existe pas.`);
      }
      return response.status(HttpStatus.OK).json({
        message: `Offre désactivée avec succès.`,
        offre,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

  // Obtenir les candidatures liées à une offre
  @Get('/candidats/:id')
  async getCandidatsForOffre(@Res() response: Response, @Param('id') offreId: string) {
    try {
      const getCandidature = await this.offreService.getCandidatsForOffre(offreId);
      return response.status(HttpStatus.OK).json({
        message: `Candidatures pour l'offre '${offreId}' récupérées avec succès !`,
        getCandidature,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Échec de la récupération des candidatures pour l'offre '${offreId}'.`,
        error: error.message,
      });
    }
  }

  // Statistique: Nombre total d'offres
  @Get('/stat/total')
  async getOffresCount(@Res() response: Response) {
    try {
      const total = await this.offreService.countOffres();
      return response.status(HttpStatus.OK).json({
        message: `Nombre total d'offres récupéré avec succès !`,
        total,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Échec de la récupération du nombre total d'offres.`,
        error: error.message,
      });
    }
  }

  // Statistique: Nombre de candidatures par offre
  @Get('/stat/nbCandidature')
  async nbCandidaturesOffre(@Res() response: Response) {
    try {
      const data = await this.offreService.nbCandidaturesParOffre();
      return response.status(HttpStatus.OK).json({
        message: `Nombre de candidatures par offre récupéré avec succès !`,
        data,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Échec de la récupération des candidatures par offre.`,
        error: error.message,
      });
    }
  }
}
