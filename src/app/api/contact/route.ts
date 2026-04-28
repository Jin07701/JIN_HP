import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;
const ipRequestMap = new Map<string, { count: number, lastRequest: number }>();

function cleanInput(str: unknown): string {
    if (typeof str !== 'string') return '';
    // Basic sanitization: remove HTML tags to prevent XSS
    return str.replace(/<[^>]*>?/gm, '');
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let { name, email, category, message } = body;

        // 1. Validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: '必須項目が入力されていません' }, { status: 400 });
        }

        // Length checks
        if (message.length > 2000) {
            return NextResponse.json({ error: 'メッセージが長すぎます（最大2000文字）' }, { status: 400 });
        }

        // Sanitization
        name = cleanInput(name);
        email = cleanInput(email);
        category = cleanInput(category);
        message = cleanInput(message);

        // 2. Simple Rate Limiting (In-Memory)
        // Note: in serverless/Edge, this Map might reset often, but helps against basic burst scripts.
        const ip = 'client-ip-placeholder'; // In real app, get from headers if needed

        const now = Date.now();
        const userRecord = ipRequestMap.get(ip) || { count: 0, lastRequest: 0 };

        if (now - userRecord.lastRequest < RATE_LIMIT_WINDOW) {
            if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
                return NextResponse.json({ error: '送信回数が多すぎます。しばらく待ってから再送信してください。' }, { status: 429 });
            }
            userRecord.count++;
        } else {
            userRecord.count = 1;
            userRecord.lastRequest = now;
        }
        ipRequestMap.set(ip, userRecord);

        // E-mail Configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'jinadachi077@gmail.com',
                pass: process.env.GMAIL_PASS || 'your-app-password',
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
            console.log(mailOptions);
            return NextResponse.json({ success: true, message: 'Message logged (No SMTP credentials)' });
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
