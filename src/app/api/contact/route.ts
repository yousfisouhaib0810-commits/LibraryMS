import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message, type, appName, duration, budget } = body;

        // 1. إعداد المرسل (Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const isService = type === 'service';
        const subjectPrefix = isService ? '🚀 New Project Request' : '📩 New Contact Message';
        const mailSubject = `${subjectPrefix}: ${appName || subject || 'No Subject'}`;

        // 2. تجهيز محتوى إيميل الإدارة
        let emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: ${isService ? '#8b5cf6' : '#3b82f6'}; border-bottom: 2px solid #eee; padding-bottom: 10px;">
          ${subjectPrefix}
        </h2>
        <p style="font-size: 16px;"><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
    `;

        if (isService) {
            emailHtml += `
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>App Name:</strong> ${appName || 'N/A'}</p>
          <p><strong>Duration:</strong> ${duration || 'N/A'}</p>
          <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        </div>
      `;
        } else {
            emailHtml += `<p><strong>Subject:</strong> ${subject || 'N/A'}</p>`;
        }

        emailHtml += `
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-wrap; background: #fff; padding: 15px; border: 1px solid #eee; border-radius: 8px;">${message || 'No message content.'}</div>
      </div>
    `;

        // 3. إرسال الإيميل للإدارة
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            replyTo: email,
            subject: mailSubject,
            html: emailHtml,
        });

        // 4. إرسال رد تلقائي للمستخدم
        const userSubject = isService ? 'Project Request Received - Souhaib Yousfi' : 'Message Received - Souhaib Yousfi';
        const userHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #1f2937; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin: 0; font-size: 28px; font-weight: 700;">Thank You for Reaching Out!</h1>
        </div>
        
        <p style="margin-bottom: 20px;">Hello <strong>${name}</strong>,</p>
        
        <p style="margin-bottom: 20px;">I hope this email finds you well.</p>
        
        <p style="margin-bottom: 20px;">I have received your ${isService ? 'project request' : 'message'} and I'm excited to learn more about it.</p>
        
        <p style="margin-bottom: 30px;">I wanted to let you know that I am personally reviewing your details and I will get back to you with a response as soon as possible, usually within 24-48 hours.</p>
        
        <div style="background-color: #f3f4f6; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #1f2937; font-weight: 700;">What happens next?</h3>
          <p style="margin: 0; font-size: 14px; color: #4b5563;">
            I'll review your requirements and follow up via this email address to discuss potential next steps or clarify any details.
          </p>
        </div>
        
        <p style="margin-bottom: 30px;">If you have any urgent updates in the meantime, feel free to reply directly to this email or reach out to me on WhatsApp.</p>
        
        <p style="margin-top: 40px; margin-bottom: 5px;">Best regards,</p>
        <p style="margin: 0; font-weight: 700; font-size: 16px;">Souhaib Yousfi</p>
        <p style="margin: 0; color: #4b5563;">Full Stack Developer</p>
        
        <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af;">
          <p>© ${new Date().getFullYear()} Souhaib Yousfi. All rights reserved.</p>
        </div>
      </div>
    `;

        try {
            await transporter.sendMail({
                from: `"Souhaib Yousfi" <${process.env.SMTP_USER}>`,
                to: email,
                subject: userSubject,
                html: userHtml,
            });
        } catch (e) {
            console.error('Auto-reply failed', e);
        }

        // 5. (اختياري) حفظ الرسالة في قاعدة البيانات عبر الباك اند القديم
        try {
            await fetch('https://library-backend-vtqw.onrender.com/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        } catch (err) {
            console.log('Backend save skipped/failed but email sent');
        }

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Email API Error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
