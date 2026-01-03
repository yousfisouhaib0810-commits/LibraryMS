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
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px;">
        <h1 style="color: #3b82f6; text-align: center;">Thank You!</h1>
        <p>Hello <strong>${name}</strong>,</p>
        <p>I received your ${isService ? 'project request' : 'message'} and will get back to you soon.</p>
        <p>Best regards,<br><strong>Souhaib Yousfi</strong></p>
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
