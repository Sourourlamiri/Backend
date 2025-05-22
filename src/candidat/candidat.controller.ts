import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import { Candidat } from './entities/candidat.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('Candidat')
export class CandidatController {
  constructor(private readonly candidatService: CandidatService) { }

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
  async createCandidat(@Res() response, @Body() CreateCandidatDto: CreateCandidatDto, @UploadedFile() file: any) {
    try {
      CreateCandidatDto.image = file ? file.filename : null;

      const newCandidat = await this.candidatService.createCandidat(CreateCandidatDto)
      return response.status(HttpStatus.CREATED).json({
        message: `Candidat a été ecrit avec succée!`,
        newCandidat
      })



    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `La création de candidat a été échouée!` + error,
      })



    }
  }
  @Get()
  async list(@Res() response) {
    try {
      const list = await this.candidatService.list();
      return response.status(HttpStatus.OK).json({
        message: `Liste de candidats!`,
        list
      })

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Liste candidat introuvable!`,
      })
    }
  }





  @Delete('/:id')
  async deleteCandidat(@Res() response, @Param('id') CandidatId: string) {
    try {
      const CandidatDelete = await this.candidatService.deleteCandidat(CandidatId)
      return response.status(HttpStatus.OK).json({
        message: `candidat a été supprimé! `,
        CandidatDelete
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `candidat n'été pas supprimé! ` + error
      })
    }
  }





  @Put('/:id')
  async updateCandidat(@Res() response, @Param('id') CandidatId: string, @Body() updateCandidat: UpdateCandidatDto) {
    try {
      const CandidatUpdate = await this.candidatService.updateCandidat(CandidatId, updateCandidat)
      return response.status(HttpStatus.OK).json({
        message: `candidat a été mis à jour! `,
        CandidatUpdate
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `candidat n'été pas mis à jour! ` + error
      })
    }
  }




  @Get('/:id')
  async getbyId(@Res() response, @Param('id') CandidatId: string) {
    try {
      const getCandidat = await this.candidatService.getbyId(CandidatId)
      return response.status(HttpStatus.OK).json({
        message: `candidat avec '${CandidatId}'a été trouvé!`,
        getCandidat
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `candidat avec '${CandidatId}'  n'été pas trouvé!` + error
      })
    }
  }

  // Route pour obtenir le nombre total de candidats
  @Get('/stat/total')
  async getCandidatsCount(): Promise<{ total: number }> {
    const total = await this.candidatService.countCandidats();
    return { total };
  }



  // repartition géographique des candidats
  @Get('/stat/geographique')
  async getRepartitionGeographique(@Res() response) {
    try {
      const repartition = await this.candidatService.getRepartitionGeographique();
      return response.status(HttpStatus.OK).json({
        message: 'Répartition géographique des candidats',
        repartition
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erreur lors de la récupération de la répartition géographique',
        error: error.message
      });
    }
  }

}