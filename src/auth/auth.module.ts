import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './strategies/refreshTokensstrategies';
import { AccessTokenStrategy } from './strategies/accessTokenStrategies';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[JwtModule.register({}),UtilisateurModule,
  MailerModule.forRoot({
    transport:{
      host:'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth:{
        user:"cfe3577fa0200b",
        pass:"0bdb2b638b53ef"
      }
    }
  })
   ],
  controllers: [AuthController],
  providers: [AuthService,RefreshTokenStrategy,AccessTokenStrategy],
})
export class AuthModule {}
