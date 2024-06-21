import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { GoogleGuard } from './guards/google.guard';
import { User } from '@decorators/user.decorator';
import { GithubGuard } from './guards/github.guard';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('verify/:token')
  verifyToken(@Param('token') token) {
    return this.authService.verifyToken(token);
  }

  @Post('send-verifiaction')
  @UseGuards(JwtGuard)
  sendToken(@User() user) {
    return this.authService.sendToken(user.id);
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  google() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  googleRedirect(@User() user) {
    return this.authService.googleRedirect(user);
  }
  @Post('refresh-token')
  refreshTokens(@Body('refresh_token') refreshToken) {
    return this.authService.refreshToken(refreshToken);
  }

  @Get('github')
  @UseGuards(GithubGuard)
  github() {}

  @Get('github/redirect')
  @UseGuards(GithubGuard)
  githubRedirect(@User() user) {
    return this.authService.githubRedirect(user);
  }

  @Post('send-rest-password')
  @UseGuards(JwtGuard)
  restPassword(@User() user) {
    return this.authService.createPasswordToken(user.sub);
  }
  @Get('rest-password')
  getRestPassword(@Query('token') token) {
    return this.authService.showRestPasswordTemplate(token);
  }
  @Post('rest-password')
  postRestPassword(@Body('password') password, @Query('token') token) {
    return this.authService.changePassword(password, token);
  }
}
