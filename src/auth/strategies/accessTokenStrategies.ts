import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
type JWTPayload={
    sub:string, //sub est l'ID de l'utilisateur
    username:string //username est le nom d'utilisateur
}
// access token straegy howa eli y5alik ta3mil controle 3la l'utilisateur ki ykoun 3andou access token jwt
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        const jwtAccessSecret=process.env.JWT_ACCESS_SECRET
        if(!jwtAccessSecret){
            throw new Error("JWT_ACCESS_SECRET does not existe in .env")
        }
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:jwtAccessSecret
        })
    }
    validate(payload:JWTPayload) {
        return payload
    }
}
