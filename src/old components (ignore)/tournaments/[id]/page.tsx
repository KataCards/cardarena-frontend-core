import TournamentDetailPage from './ClientPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TournamentPage({ params }: PageProps) {
  const { id } = await params;
  console.log('TournamentPage: Received params');
  console.log('TournamentPage: Tournament ID:', id);

  // Simply pass the ID to the client component - no server-side data fetching
  return <TournamentDetailPage tournamentId={id} />;
}
