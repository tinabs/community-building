import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  // Placeholder - will be implemented
  const { notificationId } = await params;
  return NextResponse.json({ success: false });
}
