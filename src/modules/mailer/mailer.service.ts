import { Injectable } from '@nestjs/common';
import { MailerService as EmailerService } from '@nestjs-modules/mailer';
import { verifyEmailTemplate } from '@templates/verifyEmail';
import { ConfigService } from '@nestjs/config';
import { restPasswordEmailTemplate } from '@templates/restPasswordEmail';
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
      html: verifyEmailTemplate(url),
    });
  }

  /**
   *
   * @param to - which is the email
   * @param name - the user name
   * @param url - the link to the Rest Password
   * @description method for send an rest password email
   */
  async sendRestPassword(to: string, name, url: string) {
    return this.emailerService.sendMail({
      subject: 'Rest Your Password',
      to,
      from: this.configService.get('MAIL_USER'),
      html: restPasswordEmailTemplate(name, url),
    });
  }
}
