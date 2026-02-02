import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, category, message } = body;

        // Note: Real email sending requires SMTP credentials (e.g. Gmail App Password)
        // Env vars: GMAIL_USER, GMAIL_PASS
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'jinadachi077@gmail.com', // Sender address (must be authenticated)
                pass: process.env.GMAIL_PASS || 'your-app-password', // App Password
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER || 'jinadachi077@gmail.com',
            to: 'jinadachi077@gmail.com',
            subject: `[HP Contact] ${category} - ${name}`,
            text: `
Name: ${name}
Email: ${email}
Category: ${category}

Message:
${message}
            `,
        };

        // If credentials are not set, we can't send.
        if (!process.env.GMAIL_PASS) {
            console.warn('Email credentials not found. Logging email instead.');
            console.log('--- Email Content ---');
            console.log(mailOptions);
            console.log('---------------------');
            // Mock success for user feedback
            return NextResponse.json({ success: true, message: 'Message logged (No SMTP credentials)' });
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
