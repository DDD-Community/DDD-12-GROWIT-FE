import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // 프로덕션에서는 404 반환
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const { level, message, data } = await request.json();
    const timestamp = new Date().toISOString().slice(11, 23);

    console.log(`[${timestamp}][WebView:${level}]`, message, data ?? '');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
