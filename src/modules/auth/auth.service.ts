import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

import { Repository } from 'typeorm';
import { EmailToken } from './entities/email-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '../mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { successfulyVerificationTemplate } from '../../shared/templates/successfulyVerificationEmail';
import { User } from '../users/entities/user.entity';
import { Payload } from '@interfaces/payload.interface';
import { PasswordToken } from './entities/password-token.entity';
import { restPasswordTemplate } from '@templates/restPassword';
import { successfulyRestPasswordTemplate } from '@templates/successfulyRestPassword';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmailToken)
    private readonly emailTokenRepository: Repository<EmailToken>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    @InjectRepository(PasswordToken)
    private readonly passwordTokenRepository: Repository<PasswordToken>,
  ) {}
  /**
   * @param createUserDto
   * @returns Access & Refresh tokens & the user
   * @description method for creating an account in the website
   */
  async signUp(createUserDto: CreateUserDto) {
    // Creating User
    const user = await this.usersService.create(createUserDto);
    // sending verification email
    await this.sendToken(user.id);
    const payload = {
      sub: user.id,
    };
    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshToken(payload);
    return {
      refreshToken,
      accessToken,
      user,
    };
  }
  /**
   *
   * @param signInDto
   * @returns Access & Refresh tokens & the user
   * @description method for signing in the website
   */
  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne({
      where: { email: signInDto.email },
    });
    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException('Email or Password is incorect');
    }
    const payload: Payload = {
      sub: user.id,
    };

    return this.generateAccessAndRefreshToken(payload);
  }
  /**
   *
   * @param userId
   * @returns Successfuly Message
   * @description method for creating email token and send it to the user email to verify the email
   */
  async sendToken(userId: string | number) {
    const user = await this.usersService.findOne({ where: { id: userId } });
    await this.emailTokenRepository.delete(userId);
    const { token } = await this.createEmailToken(user);
    await this.mailerService.sendVerificationEmail(
      user.email,
      `${this.configService.get('WEBSITE_URL')}/api/v1/auth/verify/${token}`,
    );
    return {
      message: 'Check your Email Box',
    };
  }
  /**
   *
   * @param token
   * @returns Successfuly html page
   * @description method for verifing the email and updating the user verification
   */
  async verifyToken(token: string) {
    try {
      const emailToken = await this.emailTokenRepository.findOne({
        where: { token },
      });

      if (Date.now() > emailToken.expiresAt)
        throw new GoneException(
          'The email verification token has expired. Please request a new verification email.',
        );
      const user = await this.usersService.findOne({
        where: { id: emailToken.userId },
      });
      if (user.verified)
        throw new BadRequestException('Your Email already Verified');
      await this.usersService.update(emailToken.userId, { verified: true });
      await this.emailTokenRepository.delete(emailToken.userId);
      return successfulyVerificationTemplate;
    } catch (error) {
      throw new NotFoundException("There's no Email with that token");
    }
  }
  /**
   *
   * @param data
   * @returns Access & Refresh tokens & the user
   * @description method for sign in with third-part , which is Google
   */
  async googleRedirect(data) {
    var user = await this.usersService.findOne({
      where: { email: data.email.value },
    });
    if (user) {
      await this.usersService.update(user.id, {
        verified: data.verified || true,
        googleId: data.id,
      });
      const newUser = await this.usersService.findOne({
        where: { id: user.id },
      });
      const payload: Payload = { sub: user.id };
      const { accessToken, refreshToken } =
        await this.generateAccessAndRefreshToken(payload);
      return {
        accessToken,
        refreshToken,
        user: newUser,
      };
    } else {
      const newUser = await this.usersService.createThirdPart({
        email: data.email.value,
        name: data.name,
        photoURL: data.photoURL,
        verified: data.email.verified,
        googleId: data.id,
      });

      const payload: Payload = { sub: newUser.id };
      const { accessToken, refreshToken } =
        await this.generateAccessAndRefreshToken(payload);
      return {
        accessToken,
        refreshToken,
        user: newUser,
      };
    }
    1;
  }
  /**
   *
   * @param user
   * @returns {EmailToken}
   * @description method for creating email token
   */
  createEmailToken(user: User): Promise<EmailToken> {
    const token = crypto.randomBytes(10).toString('hex');
    const createdAt = Date.now();
    const expiresAt = Date.now() * 1000 * 3600;
    return this.emailTokenRepository.save({
      userId: user.id,
      token,
      createdAt,
      expiresAt,
    });
  }
  /**
   *
   * @param payload
   * @returns Access & Refresh tokens
   * @description method for creating access & refresh token
   */
  async generateAccessAndRefreshToken(payload: Payload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: '5m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: '1y',
    });
    return { accessToken, refreshToken };
  }
  /**
   *
   * @param refreshToken
   * @returns Access & Refresh tokens
   * @description method for refreshing the Access & Refresh token
   */
  async refreshToken(refreshToken: string) {
    if (!refreshToken)
      throw new BadRequestException("There's no refresh token in the body");

    const { sub } = await this.jwtService.verifyAsync(refreshToken, {
      secret: await this.configService.get('REFRESH_TOKEN_SECRET'),
    });
    if (!sub) throw new UnauthorizedException();
    const user = await this.usersService.findOne({ where: { id: sub } });
    if (!user)
      throw new UnauthorizedException("There's no user with that token");
    const payload: Payload = { sub };
    return await this.generateAccessAndRefreshToken(payload);
  }
  /**
   *
   * @param data - the github callback data
   * @returns
   */
  async githubRedirect(data) {
    const user = await this.usersService.findOne({
      where: { email: data.email },
    });
    if (user) {
      await this.usersService.update(user.id, {
        githubId: data.githubId,
        verified: true,
      });
      const newUser = await this.usersService.findOne({
        where: { id: user.id },
      });
      const payload: Payload = { sub: newUser.id };
      const { accessToken, refreshToken } =
        await this.generateAccessAndRefreshToken(payload);
      return {
        accessToken,
        refreshToken,
        user: newUser,
      };
    } else {
      const newUser = await this.usersService.createThirdPart(data);
      const payload: Payload = {
        sub: newUser.id,
      };
      const { accessToken, refreshToken } =
        await this.generateAccessAndRefreshToken(payload);
      return {
        accessToken,
        refreshToken,
        user: newUser,
      };
    }
  }

  async createPasswordToken(userId: number | string) {
    const isThereToken = await this.passwordTokenRepository.findOne({
      where: { userId },
    });
    if (isThereToken) await this.passwordTokenRepository.delete(userId);
    const user = await this.usersService.findOne({ where: { id: userId } });

    const newToken = crypto.randomBytes(10).toString('hex');
    console.log(user, newToken);
    const passwordToken = await this.passwordTokenRepository.save({
      userId,
      token: newToken,
      expiresIn: Date.now() * 500 * 3600,
    });
    await this.mailerService.sendRestPassword(
      user.email,
      user.name,
      `${this.configService.get('WEBSITE_URL')}/api/v1/auth/rest-password?token=${newToken}`,
    );
    return {
      message: 'please check your email box',
      token: passwordToken.token,
    };
  }
  async showRestPasswordTemplate(token: string) {
    const restPasswordToken = await this.passwordTokenRepository.findOne({
      where: { token },
    });
    if (Date.now() > restPasswordToken.expiresIn)
      throw new BadRequestException('Token has been expires');
    if (!restPasswordToken) {
      throw new BadRequestException('There is no user with this token');
    }
    return restPasswordTemplate;
  }

  async changePassword(password: string, token: string) {
    const { userId } = await this.passwordTokenRepository.findOne({
      where: { token },
    });
    await this.usersService.update(+userId, { password });
    return successfulyRestPasswordTemplate;
  }
}
