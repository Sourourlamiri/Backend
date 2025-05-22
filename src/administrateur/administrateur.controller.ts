import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { AdministrateurService } from './administrateur.service';
import { CreateAdministrateurDto } from './dto/create-administrateur.dto';
import { UpdateAdministrateurDto } from './dto/update-administrateur.dto';

@Controller('administrateur')
export class AdministrateurController {
  constructor(private readonly administrateurService: AdministrateurService) {}

 @Post()
   async createAdministrateur(@Res() response,@Body() CreateCandidatDto:CreateAdministrateurDto) {
     try {
       const newAdministrateur = await this.administrateurService.createAdministrateur(CreateCandidatDto)
       return response.status(HttpStatus.CREATED).json({
         message:`Administrateur a été ecrit avec succée!`,
         newAdministrateur
       })
      
 
     
     } catch (error) {
       return response.status(HttpStatus.BAD_REQUEST).json({
         message:`La création de Administrateur a été échouée!`+error,
 
       
     })
   
 
   
 }
 }
 
 
 
 
 
 @Put('/:id')
   async updateAdministrateur(@Res() response,@Param('id') AdministrateurId:string,@Body()updateAdministrateur:UpdateAdministrateurDto){
     try{
       const AdministrateurUpdate=await this.administrateurService.updateAdministrateur(AdministrateurId,updateAdministrateur)
       return response.status(HttpStatus.OK).json({
         message:`Administrateur a été mis à jour! `,
         AdministrateurUpdate
         })
       }catch (error){
       return response.status(HttpStatus.BAD_REQUEST).json({
         message:`Administrateur n'été pas mis à jour! `+error
         })
       }
     }
 
     
 @Get('/:id')
 async getbyId(@Res() response,@Param('id') AdministrateurId:string){
   try{
     const getAdministrateur=await this.administrateurService.getbyId(AdministrateurId)
     return response.status(HttpStatus.OK).json({
       message:`Administrateur avec '${AdministrateurId}'a été trouvé!`,
       getAdministrateur
       })
     }catch (error){
     return response.status(HttpStatus.BAD_REQUEST).json({
       message:`Administrateur avec '${AdministrateurId}'  n'été pas trouvé!`+error
       })
     }
   }
   
 
   
 }
