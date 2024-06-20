import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateThirdPartUserDto {
  @IsString()
  name: string;

  @IsString()
  photoURL: string;

  @IsEmail()
  email: string;
  @IsBoolean()
  verified: boolean;

  googleId?: string | number;

  githubId?: string | number;
}
