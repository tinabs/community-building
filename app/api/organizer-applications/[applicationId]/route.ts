import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  // Placeholder - will be implemented
  const { applicationId } = await params;
  return NextResponse.json({ application: null });
}
