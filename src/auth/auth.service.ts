import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as argon2 from 'argon2' // Pour le hachage des mots de passe
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { ConfigService } from '@nestjs/config';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
 constructor ( private jwtService:JwtService, private UtilisateurService:UtilisateurService,private configService:ConfigService,private mailerService:MailerService){}
 

  async signIn(data:CreateAuthDto){ // Fonction pour connecter un utilisateur
    // Vérifier si l'utilisateur existe avec l'e-mail fourni
    const utilisateur=await this.UtilisateurService.findUtilisateurByEmail(data.Email)
    if(!utilisateur){
      throw new BadRequestException(`Utilisateur with this ${data.Email} does not existe`) }
      const verifyMotDePasse=await argon2.verify(utilisateur.MotDePasse,data.MotDePasse) // Vérifier le mot de passe fourni avec le mot de passe haché stocké dans la base de données
      // Si le mot de passe est incorrect, lancer une exception
      if (!verifyMotDePasse){
        throw new BadRequestException('incorrect MotDePasse')
      }
      const tokens=await this.getTokens(utilisateur._id,utilisateur.Email)

      await this.updateRefreshToken(utilisateur._id,tokens.refreshToken)
      
      return{utilisateur,accessToken :tokens.accessToken}// incloud compte pour fermee la fonction login admin entree avec login 
  }



  // creation de token 
  async getTokens(UtilisateurId:any,nom:string){ // Fonction pour générer les tokens JWT (access et refresh)
    // UtilisateurId est l'ID de l'utilisateur, nom est son nom d'utilisateur ou e-mail
    const [accessToken,refreshToken]=await Promise.all([
      this.jwtService.signAsync
      ({sub:UtilisateurId,nom},
      {secret:this.configService.get<string>('JWT_ACCESS_SECRET'),expiresIn:'1h'}
    ),

    // creation refresh 
    this.jwtService.signAsync // Fonction pour générer le token de rafraîchissement
      ({sub:UtilisateurId,nom},
      {secret:this.configService.get<string>('REFRESH_ACCESS_SECRET'),expiresIn:'7d'}
    )
    ])

    return {accessToken,refreshToken}
  }


  // fontion  t'hachi bach tzid securité 
  async updateRefreshToken(UtilisateurId:any,refreshtoken:string){
  const hashedRefreshToken=await argon2.hash(refreshtoken) // Hacher le token de rafraîchissement pour le stocker en toute sécurité

  // identification update fresh token eli hachinaha 
  await this.UtilisateurService.updateUser(UtilisateurId,{refreshtoken:hashedRefreshToken})
  
  }


  async forgetMotDePasse(Email:string){
    try {
      const utilisateur=await this.UtilisateurService.findUtilisateurByEmail(Email)
      if(!utilisateur){
        throw new NotFoundException(`L'utilisateur avec cet e-mail ${Email} n'existe pas `)
      }


      

      // create new token 
      const token =await this.jwtService.sign( // Création d'un token JWT pour la réinitialisation du mot de passe
        {id:utilisateur._id},
        {
          secret:this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn:"5m"
        }
      )
      await this.UtilisateurService.updateToken(utilisateur._id, token);
      const option = {
        to: utilisateur.Email,
        Subject: 'forgetMotDePasse',
        context: { token: token },
        html: `<h1>update your MotDePasse</h1><a href=${this.configService.get<string>('FRONTEND_URL')}/renitialisermotdepasse/${token}>click here</a>`
      };
      await this.mailerService.sendMail(option)
      return{
        success:true,
        message:'Vous pouvez changer votre MotDePasse',
        data:utilisateur
      }
    } catch (error){   
  return{
    message:`Échec de l'envoi de l'e-mail `+error
  }
    }
  } 

  


// Fonction pour réinitialiser le mot de passe
async resetMotDePasse(token:string, newPassword:string) {
  try {
    // Vérifier le token
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });
    // Trouver l'utilisateur par userEmail (extrait du token)
    const user = await this.UtilisateurService.findutilisateurbyId(payload.id);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Chiffrer le nouveau mot de passe
    const hashedPassword = await argon2.hash(newPassword);// Hachage du nouveau mot de passe
    // Vérifier si le token de réinitialisation correspond à celui stocké dans l'utilisateur
    // Mettre à jour le mot de passe et supprimer le token de réinitialisation
    await this.UtilisateurService.updateUser(user._id as string, {
      MotDePasse: hashedPassword,
      refreshToken:undefined, // On supprime le token pour éviter une réutilisation
    });
    return {
      success: true,
      message: 'Mot de passe mis à jour avec succès',
    };
  } catch (error) {
    throw new BadRequestException('Échec de la réinitialisation du mot de passe: ' + error.message);
  }
}



// function update
async updatePassword(userId: string, MotDePasse: string, newPassword: string) { // Fonction pour mettre à jour le mot de passe d'un utilisateur
  try {
    // Récupérer l'utilisateur depuis la base de données
    const user = await this.UtilisateurService.findutilisateurbyId(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Vérifier si l'ancien mot de passe est correct
    const isPasswordValid = await argon2.verify(user.MotDePasse, MotDePasse);
    if (!isPasswordValid) {
      throw new BadRequestException('Le mot de passe actuel est incorrect');
    }

    // Chiffrer le nouveau mot de passe
    const hashedNewPassword = await argon2.hash(newPassword);// Hachage du nouveau mot de passe

    // Mettre à jour le mot de passe
    await this.UtilisateurService.updateUser(userId, { MotDePasse: hashedNewPassword });

    return {
      success: true,
      message: 'Mot de passe mis à jour avec succès',
    };
  } catch (error) {
    throw new BadRequestException('Échec de la mise à jour du mot de passe: ' + error.message);
  }
}
}


    
