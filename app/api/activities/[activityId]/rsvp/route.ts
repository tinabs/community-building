import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ activityId: string }> }
) {
  // Placeholder - will be implemented
  const { activityId } = await params;
  return NextResponse.json({ rsvp: null });
}
