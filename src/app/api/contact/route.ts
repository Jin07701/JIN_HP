import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

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
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        // Save to Supabase DB if configured
        let notificationEmail = process.env.ADMIN_EMAIL || ''; // Use env var
        
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            );
            
            // Fetch dynamic email recipient from site_settings
            const { data: settingData } = await supabase
                .from('site_settings')
                .select('setting_value')
                .eq('setting_key', 'contact_email_recipient')
                .single();
                
            if (settingData?.setting_value) {
                notificationEmail = settingData.setting_value;
            }
            
            // Insert inquiry
            const { error: dbError } = await supabase
                .from('inquiries')
                .insert([
                    { name, email, category, message }
                ]);
                
            if (dbError) {
                console.error('Error saving to Supabase:', dbError);
                // We don't fail the request if just the DB insert fails, we still try email
            } else {
                console.log('Successfully saved inquiry to Supabase');
            }
        }

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: notificationEmail,
            subject: `[HP Contact] ${category} - ${name}`,
            text: `
Name: ${name}
Email: ${email}
Category: ${category}

Message:
${message}
            `,
        };

        // If credentials are not set, we can't send email.
        if (!process.env.GMAIL_PASS) {
            console.warn('Email credentials not found. Logging email instead.');
            console.log(mailOptions);
            return NextResponse.json({ success: true, message: 'Message saved to DB & logged (No SMTP credentials)' });
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
