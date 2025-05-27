import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
type JWTPayload={
    sub:string,
    username:string
}
// refresh token strategy howa eli y5alik ta3mil controle 3la l'utilisateur ki ykoun 3andou refresh token jwt
// w y5alik ta3mil generate access token jdida ki ykoun l'old access token mta3ou expired( ythabat men authization header)
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor(){
        const jwtRefreshSecret=process.env.REFRESH_ACCESS_SECRET
        if(!jwtRefreshSecret){
            throw new Error("REFRESH_ACCESS_SECRET  does not existe in .env")
        }
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:jwtRefreshSecret,
            passReqToCallback:true
        })
    }
    validate(req:Request,payload:JWTPayload){
        const authHeader=req.get('Authorization')
        if(!authHeader){
            throw new UnauthorizedException('Authorization header is missing')
        }
        const refreshToken=authHeader.replace('Bearer','').trim()
        return {...payload,refreshToken}
    }
}
