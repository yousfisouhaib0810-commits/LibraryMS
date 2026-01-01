import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactService {
  private transporter;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST') || 'smtp.gmail.com',
      port: this.configService.get<number>('SMTP_PORT') || 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async create(createContactDto: CreateContactDto) {
    let savedRequest = null;

    // 1. Only save to database if it's a project request (type 'service')
    if (createContactDto.type === 'service') {
      savedRequest = await this.prisma.contactMessage.create({
        data: {
          name: createContactDto.name,
          email: createContactDto.email,
          appName: createContactDto.appName,
          duration: createContactDto.duration,
          budget: createContactDto.budget,
          message: createContactDto.message,
          type: 'service',
        },
      });
    }

    // 2. Send email for both types
    try {
      const adminEmail = this.configService.get<string>('SMTP_USER');
      if (adminEmail) {
        const isService = createContactDto.type === 'service';
        const subjectPrefix = isService ? '🚀 New Project Request' : '📩 New Contact Message';
        const mailSubject = `${subjectPrefix}: ${createContactDto.appName || createContactDto.subject || 'No Subject'}`;

        let emailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: ${isService ? '#8b5cf6' : '#3b82f6'}; border-bottom: 2px solid #eee; padding-bottom: 10px;">
              ${subjectPrefix}
            </h2>
            <p style="font-size: 16px;"><strong>From:</strong> ${createContactDto.name} (<a href="mailto:${createContactDto.email}">${createContactDto.email}</a>)</p>
        `;

        if (isService) {
          emailHtml += `
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>App Name:</strong> ${createContactDto.appName || 'N/A'}</p>
              <p><strong>Duration:</strong> ${createContactDto.duration || 'N/A'}</p>
              <p><strong>Budget:</strong> ${createContactDto.budget || 'N/A'}</p>
            </div>
          `;
        } else {
          emailHtml += `<p><strong>Subject:</strong> ${createContactDto.subject || 'N/A'}</p>`;
        }

        emailHtml += `
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-wrap; background: #fff; padding: 15px; border: 1px solid #eee; border-radius: 8px;">${createContactDto.message || 'No message content.'}</div>
            <footer style="margin-top: 30px; color: #9ca3af; font-size: 12px; text-align: center;">
              Sent via Portfolio Contact Form
            </footer>
          </div>
        `;

        await this.transporter.sendMail({
          from: `"${createContactDto.name}" <${createContactDto.email}>`,
          to: adminEmail,
          subject: mailSubject,
          html: emailHtml,
        });
        console.log('Email sent successfully to:', adminEmail);
      } else {
        console.warn('SMTP_USER not configured, skipping email send.');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    }

    return savedRequest || { status: 'Success', message: 'Email sent successfully' };
  }

  findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.contactMessage.delete({
      where: { id },
    });
  }
}
