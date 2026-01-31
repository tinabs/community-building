import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ matchId: string }>;
}): Promise<Metadata> {
  const { matchId } = await params;
  return {
    title: `Buddy Match ${matchId}`,
    description: 'View your buddy match',
  };
}

export default async function BuddyMatchPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  // Placeholder - will be implemented
  return <div>Buddy Match Page: {matchId}</div>;
}
