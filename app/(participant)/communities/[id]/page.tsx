import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCommunityById, getActivitiesForCommunity } from '@/lib/data/mockData';

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const community = getCommunityById(id);
  const activities = getActivitiesForCommunity(id);

  if (!community) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Bold Nike Style */}
      <div className="relative h-[500px] w-full overflow-hidden bg-black">
        <Image
          src={community.images[0]}
          alt={community.name}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <Badge className="bg-red-600 text-white border-0 font-bold uppercase text-xs tracking-widest px-4 py-2 mb-6">
              {community.vibe}
            </Badge>
            <h1 className="text-6xl md:text-8xl font-athletic text-white mb-4 leading-none">
              {community.name.toUpperCase()}
            </h1>
            <p className="text-2xl text-white/90 uppercase tracking-wider font-bold">
              {community.location.neighborhood}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-12">
          <Link href="/home">
            <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white btn-premium">
              ← BACK
            </Button>
          </Link>
        </div>

        {/* Stats Cards - Nike Minimal Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white border-2 border-black shadow-premium">
            <CardContent className="pt-8 pb-8 text-center">
              <p className="text-7xl font-athletic text-black mb-2">{community.memberCount}</p>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Members</p>
            </CardContent>
          </Card>

          <Card className="bg-black border-2 border-black shadow-premium">
            <CardContent className="pt-8 pb-8 text-center">
              <p className="text-5xl mb-3">
                {community.vibe === 'running' ? '🏃' : '🚴'}
              </p>
              <p className="text-sm text-white uppercase tracking-widest font-bold">{community.vibe}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-black shadow-premium">
            <CardContent className="pt-8 pb-8 text-center">
              <p className="text-7xl font-athletic text-black mb-2">{activities.length}</p>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Activities</p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <div className="bg-white border-2 border-black shadow-premium p-8 mb-16">
          <h2 className="text-3xl font-athletic text-black mb-6 uppercase">About</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {community.description}
          </p>
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Fitness Levels</h3>
            <div className="flex flex-wrap gap-3">
              {community.fitnessLevels.map((level) => (
                <Badge
                  key={level}
                  className="bg-gray-100 text-black border-0 text-sm px-4 py-2 capitalize font-bold uppercase tracking-wider"
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Activities */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-athletic text-black uppercase">Upcoming Activities</h2>
            <Badge className="bg-red-600 text-white border-0 font-bold text-lg px-4 py-2">
              {activities.length}
            </Badge>
          </div>

          {activities.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activities.map((activity) => {
                const spotsLeft = activity.capacity - activity.rsvpCount;
                const isFull = activity.rsvpCount >= activity.capacity;
                const progress = (activity.rsvpCount / activity.capacity) * 100;

                return (
                  <Link 
                    key={activity.id} 
                    href={`/activities/${activity.id}`}
                  >
                    <Card className="bg-white border-2 border-transparent hover:border-black shadow-premium card-hover h-full">
                      <CardContent className="pt-8 pb-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <h3 className="text-2xl font-athletic text-black mb-2 uppercase">{activity.title}</h3>
                            <p className="text-gray-600 line-clamp-2">
                              {activity.description}
                            </p>
                          </div>
                          <Badge className="bg-gray-100 text-black border-0 text-xs font-bold uppercase tracking-wider ml-4">
                            {activity.fitnessLevel}
                          </Badge>
                        </div>

                        <div className="space-y-3 mb-6 text-sm">
                          <div className="flex items-center gap-2 text-gray-700 font-medium">
                            <span>📅</span>
                            <span>{formatDate(activity.dateTime)}</span>
                            <span>•</span>
                            <span>{formatTime(activity.dateTime)}</span>
                            <span>•</span>
                            <span>{activity.duration}min</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 font-medium">
                            <span>📍</span>
                            <span className="truncate">{activity.location.name}</span>
                          </div>
                        </div>

                        {/* Capacity Progress */}
                        <div className="mb-6">
                          <div className="flex justify-between text-xs uppercase tracking-wider font-bold mb-2">
                            <span className="text-gray-600">
                              {activity.rsvpCount}/{activity.capacity} Spots
                            </span>
                            {!isFull ? (
                              <span className="text-green-600">
                                {spotsLeft} Left
                              </span>
                            ) : (
                              <span className="text-red-600">Full</span>
                            )}
                          </div>
                          <div className="h-2 bg-gray-200 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${
                                isFull ? 'bg-red-600' : 'bg-black'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        {activity.buddyMatchingEnabled && (
                          <div className="flex items-center gap-2 text-xs bg-gray-100 border-2 border-gray-300 p-3 mb-4 font-bold uppercase tracking-wider">
                            <span>💙</span>
                            <span>Buddy Matching</span>
                          </div>
                        )}

                        <Button className="w-full bg-black text-white border-0 hover:bg-gray-900 btn-premium py-6">
                          VIEW DETAILS →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border-2 border-black shadow-premium p-16 text-center">
              <div className="text-7xl mb-4 opacity-30">📅</div>
              <h3 className="text-2xl font-athletic text-black uppercase mb-2">No Activities</h3>
              <p className="text-gray-600">Check back soon for new events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
