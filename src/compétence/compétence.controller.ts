import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { CompetenceService } from './compétence.service';
import { CreateCompetenceDto } from './dto/create-compétence.dto';
import { UpdateCompetenceDto } from './dto/update-compétence.dto';

@Controller('Competence')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}

 
  @Post()
  async createCompetence(@Res() response, @Body() createCompetenceDto: CreateCompetenceDto) {
    try {
      const newCompetence = await this.competenceService.createCompetence(createCompetenceDto);
      return response.status(HttpStatus.CREATED).json({
        message: `Compétence a été créée avec succès!`,
        newCompetence
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `La création de la compétence a échoué!`,
        error: error.message || 'Un problème est survenu.'
      });
    }
  }


  @Delete('/:id')
  async deleteCompetence(@Res() response, @Param('id') competenceId: string) {
    try {
      const competenceDelete = await this.competenceService.deleteCompetence(competenceId);
      return response.status(HttpStatus.OK).json({
        message: `Compétence a été supprimée avec succès!`,
        competenceDelete
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `La compétence n'a pas pu être supprimée!`,
        error: error.message || 'Un problème est survenu.'
      });
    }
  }


  @Put('/:id')
  async updateCompetence(@Res() response, @Param('id') competenceId: string, @Body() updateCompetenceDto: UpdateCompetenceDto) {
    try {
      const competenceUpdate = await this.competenceService.updateCompetence(competenceId, updateCompetenceDto);
      return response.status(HttpStatus.OK).json({
        message: `Compétence a été mise à jour avec succès!`,
        competenceUpdate
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `La compétence n'a pas pu être mise à jour!`,
        error: error.message || 'Un problème est survenu.'
      });
    }
  }





@Get()
async list(@Res() response) {
  try {
    const list = await this.competenceService.list()
    return response.status(HttpStatus.OK).json({
      message:`Liste de compétence !`,
      list
    })
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message:`Liste compétence  introuvable!`, 
  })
}
}



  // استرجاع (GET by id)
  @Get('/:id')
  async getById(@Res() response, @Param('id') competenceId: string) {
    try {
      const competence = await this.competenceService.getbyId(competenceId);
      return response.status(HttpStatus.OK).json({
        message: `Compétence avec '${competenceId}' a été trouvée!`,
        competence
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Compétence avec '${competenceId}' n'a pas été trouvée!`,
        error: error.message || 'Un problème est survenu.'
      });
    }
  }
}