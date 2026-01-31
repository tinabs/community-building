import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Manage Activity ${id}`,
    description: 'Manage activity participants and buddy matches',
  };
}

export default async function ActivityManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Placeholder - will be implemented
  return <div>Activity Management Page: {id}</div>;
}
