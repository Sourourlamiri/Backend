import { Controller, Post, Body, Get, Res, HttpStatus, Param, Put, Delete } from '@nestjs/common';
import { AvisService } from './avis.service';
import { CreateAvisDto } from './dto/create-avi.dto';
import { UpdateAvisDto } from './dto/update-avi.dto';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) { }

  // Route pour créer un avis
  @Post()
  create(@Body() createAvisDto: CreateAvisDto) {
    return this.avisService.createAvis(createAvisDto);
  }

  // Route pour récupérer tous les avis
    @Get()
    async list(@Res() response) {
      try {
        const list = await this.avisService.list()
        return response.status(HttpStatus.OK).json({
        message: `Liste de avis !`,
          list
        })
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Liste avis introuvable!`,
      })
    }
    }

    // (GET by id)
      @Get('/:id')
      async getById(@Res() response, @Param('id') avisId: string) {
        try {
          const avis = await this.avisService.getbyId(avisId);
          return response.status(HttpStatus.OK).json({
            message: `Avis avec '${avisId}' a été trouvé!`,
            avis
          });
        } catch (error) {
          return response.status(HttpStatus.BAD_REQUEST).json({
            message: `Avis avec '${avisId}' n'a pas été trouvé!`,
            error: error.message || 'Un problème est survenu.'
          });
        }
      }
    
  // (GET by recruteur id)
  @Get('/by-recruteur/:recruteurId')
  async getByRecruteur(@Res() response, @Param('recruteurId') recruteurId: string) {
    try {
      const avis = await this.avisService.getByRecruteur(recruteurId);
      return response.status(HttpStatus.OK).json({
        message: `Avis pour le recruteur '${recruteurId}' ont été trouvés!`,
        avis
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Avis pour le recruteur '${recruteurId}' n'ont pas été trouvés!`,
        error: error.message || 'Un problème est survenu.'
      });
    }
  }

  // (GET by recruteur id and candidat id)
  @Get('/by-recruteur-candidat/:recruteurId/:candidatId')
  async getByRecruteurAndCandidat(@Res() response, @Param('recruteurId') recruteurId: string, @Param('candidatId') candidatId: string) {
    try {
      const avis = await this.avisService.getByRecruteurAndCandidat(recruteurId, candidatId);
      return response.status(HttpStatus.OK).json({
        message: `Avis for recruteur '${recruteurId}' and candidat '${candidatId}' found!`,
        avis
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Avis not found for recruteur '${recruteurId}' and candidat '${candidatId}'!`,
        error: error.message || 'Un problème est survenu.'
      });
    }
  }

  // (PUT update avis)
  @Put('/:id')
  async update(@Res() response, @Param('id') avisId: string, @Body() updateAvisDto: UpdateAvisDto) {
    try {
      const updatedAvis = await this.avisService.updateAvis(avisId, updateAvisDto);
      return response.status(HttpStatus.OK).json({
        message: `Avis avec '${avisId}' a été mis à jour avec succès!`,
        avis: updatedAvis
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Échec de la mise à jour de l'avis avec '${avisId}'!`,
        error: error.message || 'Un problème est survenu.'
      });
    }
  }

  // (DELETE avis)
  @Delete('/:id')
  async delete(@Res() response, @Param('id') avisId: string) {
    try {
      const deletedAvis = await this.avisService.deleteAvis(avisId);
      return response.status(HttpStatus.OK).json({
        message: `Avis avec '${avisId}' a été supprimé avec succès!`,
        avis: deletedAvis
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Échec de la suppression de l'avis avec '${avisId}'!`,
        error: error.message || 'Un problème est survenu.'
      });
    }
  }
}