import { PartialType } from '@nestjs/mapped-types';
import { CreateThirdPartUserDto } from './create-third-part-user.dto';

export class UpdateThirdPartUserDto extends PartialType(
  CreateThirdPartUserDto,
) {}
