import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { GoogleGuard } from './guards/google.guard';
import { User } from '@decorators/user.decorator';
import { GithubGuard } from './guards/github.guard';

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
  @Get(':userId/send')
  sendToken(@Param('userId') userId) {
    return this.authService.sendToken(userId);
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
}
