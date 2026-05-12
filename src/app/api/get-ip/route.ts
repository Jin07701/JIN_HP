import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
    return NextResponse.json({ ip });
}
