import { Injectable } from '@nestjs/common';
import { MailerService as EmailerService } from '@nestjs-modules/mailer';
import { successfulyVerificationTemplate } from '@templates/successfulyVerification';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailerService {
  constructor(
    private readonly emailerService: EmailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   *
   * @param to - which is the email
   * @param url - the url to the verification page
   * @description method to send an verification email to a user
   */
  async sendVerificationEmail(to, url) {
    return this.emailerService.sendMail({
      to,
      subject: 'Verify Your Email Address',
      from: this.configService.get('MAIL_USER'),
      html: successfulyVerificationTemplate(url),
    });
  }
}
