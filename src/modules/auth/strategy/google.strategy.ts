import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET_ID'),
      callbackURL: `${configService.get('WEBSITE_URL')}/api/v1/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile: Profile, done: VerifyCallback) {
    const user = {
      email: profile.emails[0],
      name: profile.displayName,
      photoURL: profile.photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
