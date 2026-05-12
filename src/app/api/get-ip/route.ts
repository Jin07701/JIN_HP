import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    return NextResponse.json({ ip });
}
