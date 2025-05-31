import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { CreateCandidatureDto } from './dto/create-candidature.dto';
import { UpdateCandidatureDto } from './dto/update-candidature.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer"
import { extname } from 'path';
import { create } from 'domain';


@Controller('Candidature')
export class CandidatureController {
  constructor(private readonly candidatureService: CandidatureService) { }


  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: './cv',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))


  @Post()
  async createCandidature(@Res() response, @Body() CreateCandidatureDto: CreateCandidatureDto, @UploadedFile() file) {
    try {
      // ? si existe fichiers:parcours: sinon retourne tableau vide 
      CreateCandidatureDto.Cv = file ? file.filename : null;



      const newCandidature = await this.candidatureService.createCandidature(CreateCandidatureDto)
      return response.status(HttpStatus.CREATED).json({
        message: `Candidature a été ecrite avec succée!`,
        newCandidature
      })



    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `La création de Candidature a été échouée!` + error,


      })



    }
  }
  @Get()
  async list(@Res() response) {
    try {
      const list = await this.candidatureService.list()
      return response.status(HttpStatus.OK).json({
        message: `Liste de Candidatures!`,
        list
      })



    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Liste Candidature introuvable!`,


      })
    }
  }


@Get('/by-offre/:offreId') // Endpoint pour récupérer les candidatures par offre
async getCandidaturesByOffre(@Param('offreId') offreId: string) {
  const candidatures = await this.candidatureService.list();
  return candidatures.filter(c => c.Offre && c.Offre.toString() === offreId);
}

  @Put('/:id')
  async updateCandidature(@Res() response, @Param('id') CandidatureId: string, @Body() updateCandidature: UpdateCandidatureDto) {
    try {
      const CandidatureUpdate = await this.candidatureService.updateCandidature(CandidatureId, updateCandidature)
      return response.status(HttpStatus.OK).json({
        message: `candidature a été mise à jour! `,
        CandidatureUpdate
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `candidature n'été pas mise à jour! ` + error
      })
    }
  }

  @Patch('/:id/statut')
  async updateCandidatureStatus(@Res() response, @Param('id') candidatureId: string, @Body() body: { statut: string }) {
    try {
      if (!['acceptée', 'rejetée', 'en attente'].includes(body.statut)) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: `Statut invalide. Doit être 'acceptée', 'rejetée' ou 'en attente'`
        });
      }

      const updateData = { statut: body.statut };
      const candidatureUpdate = await this.candidatureService.updateCandidature(candidatureId, updateData);

      return response.status(HttpStatus.OK).json({
        message: `Statut de la candidature mis à jour avec succès!`,
        candidatureUpdate
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Mise à jour du statut échouée!`,
        error: error.message
      });
    }
  }

  @Delete('/:id')
  async deleteCandidature(@Res() response, @Param('id') candidatureId: string) {
    try {
      const deletedCandidature = await this.candidatureService.supprimerCandidature(candidatureId);

      return response.status(HttpStatus.OK).json({
        message: `Candidature supprimée avec succès!`,
        deletedCandidature
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Échec de la suppression de la candidature!`,
        error: error.message
      });
    }
  }

  @Get('/:id')
  async getbyId(@Res() response, @Param('id') CandidatureId: string) {
    try {
      const getCandidature = await this.candidatureService.getbyId(CandidatureId)
      return response.status(HttpStatus.OK).json({
        message: `candidature avec '${CandidatureId}'a été trouvée!`,
        getCandidature
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `candidature avec '${CandidatureId}'  n'été pas trouvée!` + error
      })
    }
  }

  // Méthode pour compter le nombre total de candidatures
  @Get('/stat/total')
  async getcandidatureCount(): Promise<{ total: number }> {
    const total = await this.candidatureService.countCondidature();
    return { total };
  }



  // Méthode pour compter le nombre total de candidatures par statut

  @Get('/stat/statut')
  async getStatsParRecruteur(@Res() res) {
    try {
      const stats = await this.candidatureService.getCandidaturesParRecruteur();

      const results = stats.map(recruteur => {
        // Initialisation des compteurs à 0
        const statsFormatees = {
          acceptees: 0,
          rejetees: 0,
          enAttente: 0
        };

        // Remplissage des valeurs existantes
        recruteur.stats.forEach(stat => {
          switch (stat.statut) {
            case 'acceptée':
              statsFormatees.acceptees = stat.count;
              break;
            case 'rejetée':
              statsFormatees.rejetees = stat.count;
              break;
            case 'en attente':
              statsFormatees.enAttente = stat.count;
              break;
          }
        });

        return {
          recruteur: {

            Nom: recruteur.recruteur.nom,
          },
          ...statsFormatees
        };
      });

      return res.status(HttpStatus.OK).json({
        message: 'Statistiques des candidatures par statut',
        results
      });

    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erreur lors du calcul des statistiques',
        error: error.message
      });
    }
  }

  @Get('/stat/par-adresse')
  async getNbCandidatParAdresse() {
    return await this.candidatureService.nbCandidatParRepartition();
  }

  @Get('/stat/par-statut')
  async getCandidaturesParStatut(@Res() res) {
    try {
      const stats = await this.candidatureService.getCandidaturesParStatut();

      // Format pour assurer que tous les statuts sont représentés
      const result = {
        acceptée: 0,
        rejetée: 0,
        'en attente': 0
      };

      stats.forEach(stat => {
        if (stat._id && stat._id in result) {
          result[stat._id] = stat.count;
        }
      });

      return res.status(HttpStatus.OK).json({
        message: 'Répartition des candidatures par statut',
        stats: result
      });

    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erreur lors du calcul des statistiques par statut',
        error: error.message
      });
    }
  }



}
