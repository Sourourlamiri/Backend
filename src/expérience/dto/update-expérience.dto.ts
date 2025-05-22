import { PartialType } from '@nestjs/mapped-types';
import { CreateExpérienceDto } from './create-expérience.dto';

export class UpdateExpérienceDto extends PartialType(CreateExpérienceDto) {}
