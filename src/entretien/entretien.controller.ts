import { Controller, Get, Post, Body, Param, Res, HttpStatus, Put, BadRequestException, NotFoundException, Delete } from '@nestjs/common';
import { EntretienService } from './entretien.service';
import { CreateEntretienDto } from './dto/create-entretien.dto';
import { UpdateEntretienDto } from './dto/update-entretien.dto';

@Controller('entretien')
export class EntretienController {
  constructor(private readonly entretienService: EntretienService) {}

  @Post()
  async createEntretien(@Res() response, @Body() createEntretienDto: CreateEntretienDto) {
    try {
      const newEntretien = await this.entretienService.createEntretien(createEntretienDto);
      return response.status(HttpStatus.CREATED).json({
        message: `Entretien a été créé avec succès!`,
        newEntretien
      });
    } catch (error) {
      console.error('Error:', error);  // Display detailed error in console
      throw new BadRequestException(`La création de l'entretien a échoué!`, error.message || 'Un problème est survenu lors de la création.');
    }
  }


  
  @Get()
  async list(@Res() response) {
    try {
      const list = await this.entretienService.list();
      return response.status(HttpStatus.OK).json({
        message: `Liste d'Entretien!`,
        list
      });
    } catch (error) {
      throw new BadRequestException(`Liste d'Entretien introuvable!`, error.message || 'Un problème est survenu lors de la récupération de la liste.');
    }
  }

  @Put('/:id')
  async updateEntretien(@Res() response, @Param('id') entretienId: string, @Body() UpdateEntretienDto: UpdateEntretienDto) {
    try {
      const updatedEntretien = await this.entretienService.updateEntretien(entretienId, UpdateEntretienDto);
      return response.status(HttpStatus.OK).json({
        message: `Entretien a été mis à jour avec succés!`,
        updatedEntretien
      });
    } catch (error) {
     return response.status(HttpStatus.NOT_FOUND).json({
        message: `echec de la mise a jour entretien !`,
        error: error.message || 'Un problème est survenu lors de la suppression.'
      });
    }
  }



  @Delete('/:id')
  async deleteEntretien(@Res() response, @Param('id') entretienId: string) {
    try {
      const deletedEntretien = await this.entretienService.supprimerEntretien(entretienId);
      return response.status(HttpStatus.OK).json({
        message: `Entretien a été supprimé avec succès!`,
        deletedEntretien
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: `Entretien avec '${entretienId}' n'a pas été trouvé!`,
        error: error.message || 'Un problème est survenu lors de la suppression.'
      });
    }
  }







  @Get('/:id')
  async getbyId(@Res() response, @Param('id') entretienId: string) {
    try {
      const getEntretien = await this.entretienService.getbyId(entretienId);
      return response.status(HttpStatus.OK).json({
        message: `Entretien avec '${entretienId}' a été trouvé!`,
        getEntretien
      });
    } catch (error) {
      throw new NotFoundException(`Entretien avec '${entretienId}' n'a pas été trouvé!`, error.message || 'Un problème est survenu lors de la récupération de l\'entretien.');
    }
  }

  @Get('/candidat/:id')
  async getEntretiensByCandidat(@Res() response, @Param('id') candidatId: string) {
    try {
      const entretiens = await this.entretienService.getEntretiensByCandidat(candidatId);
      return response.status(HttpStatus.OK).json({
        message: `Entretiens pour le candidat '${candidatId}' ont été trouvés!`,
        entretiens
      });
    } catch (error) {
      throw new NotFoundException(`Entretiens pour le candidat '${candidatId}' n'ont pas été trouvés!`, error.message || 'Un problème est survenu lors de la récupération des entretiens.');
    }
  }
}
