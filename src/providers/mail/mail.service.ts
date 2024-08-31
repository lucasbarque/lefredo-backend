import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPasswordRecovery(user: User, token: string) {
    const url = `${process.env.URL_FRONTEND}/recover-password/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
