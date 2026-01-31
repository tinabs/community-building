import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Activity Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The activity you're looking for doesn't exist.
        </p>
        <Link href="/home">
          <Button>← Back to Communities</Button>
        </Link>
      </div>
    </div>
  );
}
