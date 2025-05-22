import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Res, HttpStatus, Put } from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';



@Controller('Formation')
export class FormationController {
  constructor(private readonly FormationService: FormationService) {}


   // creer
   @Post()
     async createFormation(@Res() response,@Body() CreateFormationDto:CreateFormationDto) {
       try {
         const newFormation= await this.FormationService.createFormation(CreateFormationDto)
         return response.status(HttpStatus.CREATED).json({
           message:`Formation a été ecrit avec succée!`,
           newFormation
         })
  
       } catch (error) {
         return response.status(HttpStatus.BAD_REQUEST).json({
           message:`La création de Certification a été échouée!`,  
       }) 
   }}
  
  
  //get all

@Get()
async list(@Res() response) {
  try {
    const list = await this.FormationService.list()
    return response.status(HttpStatus.OK).json({
      message:`Liste de formation !`,
      list
    })
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message:`Liste formation  introuvable!`, 
  })
}
}
  
  // supprimier 
  
  @Delete('/:id')
    async deleteFormation(@Res() response,@Param('id') FormationId:string){
      try{
        const FormationDelete=await this.FormationService.deleteFormation(FormationId)
        return response.status(HttpStatus.OK).json({
          message:`Formation a été supprimé! `,
          FormationDelete
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
          message:`Formation 'été pas supprimé! `+error
          })
        }
      }
  
  
  
     
     // modifier 
     @Put('/:id')
       async updateFormation(@Res() response,@Param('id') FormationId:string,@Body()updateFormation:UpdateFormationDto){
         try{
           const FormationUpdate=await this.FormationService.updateFormation(FormationId,updateFormation)
           return response.status(HttpStatus.OK).json({
             message:`Formation a été mise à jour! `,
             FormationUpdate
             })
           }catch (error){
           return response.status(HttpStatus.BAD_REQUEST).json({
             message:`Formation n'été pas mise à jour! `+error
             })
           }
         }
     
        
    // get by id 
     @Get('/:id')
     async getbyId(@Res() response,@Param('id') FormationId:string){
       try{
         const getFormation=await this.FormationService.getbyId(FormationId)
         return response.status(HttpStatus.OK).json({
           message:`Formation avec '${FormationId}'a été trouvée!`,
           getFormation
           })
         }catch (error){
         return response.status(HttpStatus.BAD_REQUEST).json({
           message:` Formation avec '${FormationId}'  n'été pas trouvée!`+error
          })
        }
      }
      
    
  }
  
  
  




































































































