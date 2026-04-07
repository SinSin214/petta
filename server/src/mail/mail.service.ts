import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

type VerifyEmailParams = {
	to: string;
	name: string;
	verificationLink: string;
};

@Injectable()
export class MailService {
	constructor(private configService: ConfigService) { }

	async sendVerifyEmail({ to, name, verificationLink }: VerifyEmailParams) {
		const transporter = this.createTransporter();
		const from = this.configService.get<string>('SMTP_FROM') ?? this.configService.get<string>('SMTP_USER');

		await transporter.sendMail({
			from,
			to,
			subject: 'Verify your Petta account',
			text: `Hello ${name}, verify your Petta account by opening this link: ${verificationLink}`,
			html: `<p>Hello ${name},</p><p>Verify your Petta account by clicking the link below:</p><p><a href="${verificationLink}">Activate account</a></p><p>If you did not create this account, you can ignore this email.</p>`,
		});
	}

	private createTransporter() {
		const transportOptions: SMTPTransport.Options = {
			host: this.configService.get<string>('SMTP_HOST'),
			port: Number(this.configService.get<string>('SMTP_PORT')),
			auth: {
				user: this.configService.get<string>('SMTP_USER'),
				pass: this.configService.get<string>('SMTP_PASS'),
			},
		};

		return nodemailer.createTransport(transportOptions);
	}
}