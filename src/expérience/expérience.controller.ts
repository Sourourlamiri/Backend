import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { ExpérienceService } from './expérience.service';
import { CreateExpérienceDto } from './dto/create-expérience.dto';
import { UpdateExpérienceDto } from './dto/update-expérience.dto';

@Controller('Experience')
export class ExpérienceController {
  constructor(private readonly ExpérienceService: ExpérienceService) {}

  
  @Post()
  async createExpérience(@Res() response, @Body() CreateExpérienceDto: CreateExpérienceDto) {
    try {
      const newExpérience = await this.ExpérienceService.createExperience(CreateExpérienceDto);  
      return response.status(HttpStatus.CREATED).json({
        message: 'Expérience a été créée avec succès!',
        newExpérience
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'La création de l\'Expérience a échoué!',
      });
    }
  }

  
  @Get()
  async list(@Res() response) {
    try {
      const list = await this.ExpérienceService.list();  
      return response.status(HttpStatus.OK).json({
        message: 'Liste des expériences récupérée avec succès!',
        list
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Les expériences n\'ont pas pu être récupérées!',
      });
    }
  }


  @Delete('/:id')
  async deleteExpérience(@Res() response, @Param('id') ExpérienceId: string) {
    try {
      const ExpérienceDelete = await this.ExpérienceService.deleteExpérience(ExpérienceId);
      return response.status(HttpStatus.OK).json({
        message: 'Expérience a été supprimée!',
        ExpérienceDelete
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Expérience n'a pas été supprimée! ${error}`,
      });
    }
  }

 
  @Put('/:id')
  async updateExpérience(@Res() response, @Param('id') ExpérienceId: string, @Body() updateExpérience: UpdateExpérienceDto) {
    try {
      const ExpérienceUpdate = await this.ExpérienceService.updateExpérience(ExpérienceId, updateExpérience);
      return response.status(HttpStatus.OK).json({
        message: 'Expérience a été mise à jour!',
        ExpérienceUpdate
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Expérience n'a pas été mise à jour! ${error}`,
      });
    }
  }

  
  @Get('/:id')
  async getbyId(@Res() response, @Param('id') ExpérienceId: string) {
    try {
      const getExpérience = await this.ExpérienceService.getbyId(ExpérienceId);
      return response.status(HttpStatus.OK).json({
        message: `Expérience avec '${ExpérienceId}' a été trouvée!`,
        getExpérience
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Expérience avec '${ExpérienceId}' n'a pas été trouvée! ${error}`,
      });
    }
  }
}



