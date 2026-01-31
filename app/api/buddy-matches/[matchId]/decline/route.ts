import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  // Placeholder - will be implemented (V2, buddy only)
  const { matchId } = await params;
  return NextResponse.json({ success: false });
}
