import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  // Placeholder - will be implemented
  const { userId } = await params;
  return NextResponse.json({ user: null });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  // Placeholder - will be implemented
  const { userId } = await params;
  return NextResponse.json({ user: null });
}
