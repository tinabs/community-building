'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getActivityById, getCommunityById } from '@/lib/data/mockData';

export default function MyActivitiesPage() {
  const [rsvps, setRSVPs] = useState<string[]>([]);

  useEffect(() => {
    // Load RSVPs from localStorage
    const savedRSVPs = JSON.parse(localStorage.getItem('rsvps') || '[]');
    setRSVPs(savedRSVPs);
  }, []);

  const myActivities = rsvps
    .map((id) => getActivityById(id))
    .filter((activity) => activity && activity.dateTime > new Date())
    .sort((a, b) => a!.dateTime.getTime() - b!.dateTime.getTime());

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

  if (myActivities.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My Activities</h1>
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-2xl font-bold mb-2">No Upcoming Activities</h2>
              <p className="text-muted-foreground mb-6">
                Browse communities and RSVP for activities to see them here!
              </p>
              <Link href="/home">
                <Button>Discover Communities</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">My Activities</h1>
        <p className="text-muted-foreground mb-8">
          You have {myActivities.length} upcoming {myActivities.length === 1 ? 'activity' : 'activities'}
        </p>

        <div className="space-y-4">
          {myActivities.map((activity) => {
            if (!activity) return null;
            const community = getCommunityById(activity.communityId);
            if (!community) return null;

            const buddyRequests = JSON.parse(localStorage.getItem('buddyRequests') || '{}');
            const hasBuddyRequest = buddyRequests[activity.id];

            return (
              <Link key={activity.id} href={`/activities/${activity.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">{community.name}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs capitalize whitespace-nowrap">
                        {activity.fitnessLevel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span>📅</span>
                        <span>{formatDate(activity.dateTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>⏰</span>
                        <span>{formatTime(activity.dateTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>📍</span>
                        <span className="truncate">{activity.location.name}</span>
                      </div>
                    </div>

                    {hasBuddyRequest && (
                      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 flex items-center gap-2">
                        <span className="text-lg">💙</span>
                        <p className="text-sm text-cyan-700">
                          <strong>Buddy requested</strong> - We'll match you with an experienced member
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
