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

    // 2. Send emails in background (Fire-and-forget) to ensure instant UI response
    this.sendEmailsInBackground(createContactDto);

    return savedRequest || { status: 'Success', message: 'Message received successfully' };
  }

  private async sendEmailsInBackground(createContactDto: CreateContactDto) {
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
          from: `"Portfolio Contact Form" <${adminEmail}>`,
          to: adminEmail,
          replyTo: createContactDto.email,
          subject: mailSubject,
          html: emailHtml,
        });
        console.log('Email sent successfully to:', adminEmail);

        // 3. Send automated response to the sender
        const userSubject = isService ? 'Project Request Received - Souhaib Yousfi' : 'Message Received - Souhaib Yousfi';
        const userHtml = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #1f2937; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #3b82f6; margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
            </div>
            
            <p>Hello <strong>${createContactDto.name}</strong>,</p>
            
            <p>I hope this email finds you well.</p>
            
            <p>I have received your ${isService ? 'project request for <strong>' + (createContactDto.appName || 'your project') + '</strong>' : 'message'} and I'm excited to learn more about it.</p>
            
            <p>I wanted to let you know that I am personally reviewing your details and I will get back to you with a response as soon as possible, usually within 24-48 hours.</p>
            
            <div style="background-color: #f3f4f6; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
              <p style="margin: 0; font-size: 14px; color: #4b5563;">
                <strong>What happens next?</strong><br>
                I'll review your requirements and follow up via this email address to discuss potential next steps or clarify any details.
              </p>
            </div>
            
            <p>If you have any urgent updates in the meantime, feel free to reply directly to this email or reach out to me on WhatsApp.</p>
            
            <p style="margin-top: 40px;">Best regards,<br>
            <strong>Souhaib Yousfi</strong><br>
            Full Stack Developer</p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af;">
              <p>© ${new Date().getFullYear()} Souhaib Yousfi. All rights reserved.</p>
            </div>
          </div>
        `;

        await this.transporter.sendMail({
          from: `"Souhaib Yousfi" <${adminEmail}>`,
          to: createContactDto.email,
          subject: userSubject,
          html: userHtml,
        });
        console.log('Auto-response sent successfully to:', createContactDto.email);
      } else {
        console.warn('SMTP_USER not configured, skipping email send.');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    }
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
