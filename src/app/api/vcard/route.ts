import { NextResponse } from 'next/server';

export async function GET() {
    // Generate vCard content
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:;;;;
FN:株式会社ARISTA 代表
ORG:株式会社ARISTA
TITLE:代表
TEL;TYPE=WORK,VOICE:080-6376-1389
EMAIL;TYPE=WORK:info@arista.example.com
ADR;TYPE=WORK:;;天神2丁目2番12号T&Jビルディング7F;福岡市中央区;福岡県;;日本
URL:https://arista-hp.vercel.app/
END:VCARD`;

    // Return the vCard as a downloadable file
    return new NextResponse(vcard, {
        headers: {
            'Content-Type': 'text/vcard; charset=utf-8',
            'Content-Disposition': 'attachment; filename="contact.vcf"',
        },
    });
}
