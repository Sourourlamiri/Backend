import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetenceDto } from './create-compétence.dto';

export class UpdateCompetenceDto extends PartialType(CreateCompetenceDto) {}
