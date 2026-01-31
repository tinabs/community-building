import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ activityId: string }> }
) {
  // Placeholder - will be implemented (organizer only)
  const { activityId } = await params;
  return NextResponse.json({ matches: [] });
}
