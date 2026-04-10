import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

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

		await transporter.sendMail({
			from: 'Petta by Kha',
			to: to,
			subject: 'Verify your Petta account',
			text: `Hello ${name}, verify your Petta account by opening this link: ${verificationLink}`,
			html: `<p>Hello ${name},</p><p>Verify your Petta account by clicking the link below:</p><p><a href="${verificationLink}">Activate account</a></p><p>If you did not create this account, you can ignore this email.</p>`,
		});
	}

	private createTransporter() {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: this.configService.get<string>('SMTP_USER'),
				pass: this.configService.get<string>('GOOGLE_APP_PASSWORD'), // The 16-character App Password
			},
		});
		return transporter;
	}
}