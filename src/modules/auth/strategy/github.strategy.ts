import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: `${configService.get('WEBSITE_URL')}/api/v1/auth/github/redirect`,
      scope: 'user',
    });
  }
  validate(accessToken, refreshToken, profile: Profile, cb) {
    const user = {
      githubId: profile.id,
      name: profile.displayName || profile.name || profile.username,
      photoURL: profile.photos[0].value,
      email: profile.emails[0].value,
      verified: true,
    };

    return cb(null, user);
  }
}
