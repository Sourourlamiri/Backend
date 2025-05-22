import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorieDto } from './create-catégorie.dto';

export class UpdateCategorieDto extends PartialType(CreateCategorieDto) {}
