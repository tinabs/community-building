import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ communityId: string }> }
) {
  // Placeholder - will be implemented (organizer only)
  const { communityId } = await params;
  return NextResponse.json({ analytics: null });
}
