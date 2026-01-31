import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  // Placeholder - will be implemented (admin only)
  const { applicationId } = await params;
  return NextResponse.json({ application: null });
}
