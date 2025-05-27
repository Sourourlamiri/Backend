import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post('signin')
signIn(@Body() data:CreateAuthDto){
  return this.authService.signIn(data)
}


//forget
@Post('forget')
forgetMotDePasse(@Body() data:CreateAuthDto){ // Fonction pour envoyer un e-mail de réinitialisation de mot de passe
  // Cette fonction prend l'e-mail de l'utilisateur et envoie un e-mail avec un lien de réinitialisation
  return this.authService.forgetMotDePasse(data.Email)
}


// rest MotDePasse
@Post('reset-password/:token') // Fonction pour réinitialiser le mot de passe d'un utilisateur
async resetMotDePasse(@Param('token') token: string, @Body('newPassword') newPassword: string) {
  return this.authService.resetMotDePasse(token, newPassword);
}

// fuction update 
@Put('update-password/:id') // Fonction pour mettre à jour le mot de passe d'un utilisateur
async updatePassword(
  @Res() response,
  @Param('id') id:string,
  @Body('MotDePasse') MotDePasse:string,
  @Body('newPassword') newPassword:string
) {
  try {
    const result = await this.authService.updatePassword(id, MotDePasse, newPassword);
    return response.status(200).json(result);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error.message);
    return response.status(400).json({ success: false, message: error.message });
  }
}
}