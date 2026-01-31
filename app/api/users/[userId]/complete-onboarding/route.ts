import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  // Placeholder - will be implemented
  const { userId } = await params;
  return NextResponse.json({ user: null });
}
