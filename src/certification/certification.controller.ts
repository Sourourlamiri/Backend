import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put, HttpException } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Controller('Certification')
export class CertificationController {
  constructor(private readonly CertificationService: CertificationService) {}

  // Créer Certification
  @Post()
  async createCertification(@Res() response, @Body() CreateCertificationDto: CreateCertificationDto) {
    try {
      const newCertification = await this.CertificationService.createCertification(CreateCertificationDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'La certification a été créée avec succès!',
        newCertification
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'La création de la certification a échoué!',
          error: error.message || error
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Get All Certifications
  @Get()
  async list(@Res() response) {
    try {
      const list = await this.CertificationService.list();
      return response.status(HttpStatus.OK).json({
        message: 'Liste des certifications récupérée avec succès!',
        list
      });
    } catch (error) {
      throw new HttpException(
        {
          message: "Les certifications n'ont pas pu être récupérées!",
          error: error.message || error
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Supprimer Certification
  @Delete('/:id')
  async deleteCertification(@Res() response, @Param('id') CertificationId: string) {
    try {
      const CertificationDelete = await this.CertificationService.deleteCertification(CertificationId);
      return response.status(HttpStatus.OK).json({
        message: 'La certification a été supprimée!',
        CertificationDelete
      });
    } catch (error) {
      throw new HttpException(
        {
          message: "La certification n'a pas pu être supprimée!",
          error: error.message || error
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Modifier Certification
  @Put('/:id')
  async updateCertification(@Res() response, @Param('id') CertificationId: string, @Body() updateCertification: UpdateCertificationDto) {
    try {
      const CertificationUpdate = await this.CertificationService.updateCertification(CertificationId, updateCertification);
      return response.status(HttpStatus.OK).json({
        message: 'La certification a été mise à jour avec succès!',
        CertificationUpdate
      });
    } catch (error) {
      throw new HttpException(
        {
          message: "La certification n'a pas pu être mise à jour!",
          error: error.message || error
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Get Certification by ID
  @Get('/:id')
  async getbyId(@Res() response, @Param('id') CertificationId: string) {
    try {
      const getCertification = await this.CertificationService.getById(CertificationId);
      return response.status(HttpStatus.OK).json({
        message: `Certification avec l'ID '${CertificationId}' a été trouvée!`,
        getCertification
      });
    } catch (error) {
      throw new HttpException(
        {
          message: `Certification avec l'ID '${CertificationId}' n'a pas été trouvée!`,
          error: error.message || error
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
