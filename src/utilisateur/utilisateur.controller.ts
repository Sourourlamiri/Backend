import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}




  @Get('verify/:code')
  async verficationcode(@Param('code')code:string,@Res()response){
    return this.utilisateurService.verificationcode(code,response)
  }
}