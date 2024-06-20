import { IsNotUsedEmail } from '@validators/is-not-used-email.validtor';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  @Length(7)
  password: string;

  @IsEmail()
  @Validate(IsNotUsedEmail)
  email: string;

  @IsOptional()
  @IsString()
  photoURL?: string;
}
