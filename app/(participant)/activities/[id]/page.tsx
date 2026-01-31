'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getActivityById, getCommunityById, getRandomBuddy, type BuddyUser } from '@/lib/data/mockData';
import { BuddyMatchCard } from '@/components/buddy/BuddyMatchCard';

export default function ActivityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [activityId, setActivityId] = useState<string>('');
  const [hasRSVP, setHasRSVP] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [buddyMatch, setBuddyMatch] = useState<BuddyUser | null>(null);

  useEffect(() => {
    Promise.resolve(params).then((p) => {
      setActivityId(p.id);
      const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
      setHasRSVP(rsvps.includes(p.id));
      
      const buddyMatches = JSON.parse(localStorage.getItem('buddyMatches') || '{}');
      if (buddyMatches[p.id]) {
        setBuddyMatch(buddyMatches[p.id]);
      }
    });
  }, [params]);

  if (!activityId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-6xl animate-spin">⏳</div>
      </div>
    );
  }

  const activity = getActivityById(activityId);
  if (!activity) {
    notFound();
  }

  const community = getCommunityById(activity.communityId);
  if (!community) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const handleRSVP = () => {
    const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
    rsvps.push(activityId);
    localStorage.setItem('rsvps', JSON.stringify(rsvps));
    
    if (activity.buddyMatchingEnabled) {
      const buddy = getRandomBuddy();
      setBuddyMatch(buddy);
      
      const buddyMatches = JSON.parse(localStorage.getItem('buddyMatches') || '{}');
      buddyMatches[activityId] = buddy;
      localStorage.setItem('buddyMatches', JSON.stringify(buddyMatches));
    }

    setHasRSVP(true);
    setShowConfirmation(true);
  };

  const handleCancelRSVP = () => {
    if (confirm('Are you sure you want to cancel your RSVP?')) {
      const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
      const updated = rsvps.filter((id: string) => id !== activityId);
      localStorage.setItem('rsvps', JSON.stringify(updated));
      
      const buddyMatches = JSON.parse(localStorage.getItem('buddyMatches') || '{}');
      delete buddyMatches[activityId];
      localStorage.setItem('buddyMatches', JSON.stringify(buddyMatches));
      
      setBuddyMatch(null);
      setHasRSVP(false);
    }
  };

  const spotsLeft = activity.capacity - activity.rsvpCount;
  const isFull = activity.rsvpCount >= activity.capacity;
  const progress = (activity.rsvpCount / activity.capacity) * 100;

  const getMeetingTime = () => {
    const activityTime = new Date(activity.dateTime);
    const meetTime = new Date(activityTime.getTime() - 15 * 60000);
    return `${formatTime(meetTime)} (15 minutes before the activity starts)`;
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Confirmation Modal - Nike Style */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto p-4">
          <div className="max-w-2xl w-full my-8">
            <Card className="bg-white border-2 border-black shadow-premium-lg">
              <CardContent className="pt-8 pb-8">
                <div className="text-center mb-8">
                  <div className="text-8xl mb-4">🎉</div>
                  <h2 className="text-4xl font-athletic text-black mb-4 uppercase">You're In!</h2>
                  <p className="text-lg text-gray-700 mb-2 font-medium">
                    Registered for <strong className="text-black">{activity.title}</strong>
                  </p>
                  <p className="text-sm text-gray-600 uppercase tracking-wider font-semibold">
                    {formatDate(activity.dateTime)} • {formatTime(activity.dateTime)}
                  </p>
                </div>

                {buddyMatch && activity.buddyMatchingEnabled && (
                  <div className="mb-8">
                    <BuddyMatchCard
                      buddy={buddyMatch}
                      meetingPoint={`${activity.location.name} - Main Entrance`}
                      meetingTime={getMeetingTime()}
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 border-2 border-black hover:bg-black hover:text-white btn-premium"
                  >
                    CLOSE
                  </Button>
                  <Button
                    onClick={() => router.push('/my-activities')}
                    className="flex-1 bg-black text-white border-0 hover:bg-gray-900 btn-premium"
                  >
                    MY ACTIVITIES
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <Link href={`/communities/${community.id}`}>
            <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white mb-6 btn-premium">
              ← BACK TO {community.name.toUpperCase()}
            </Button>
          </Link>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-athletic text-black mb-4 leading-none uppercase">
                {activity.title}
              </h1>
              <Link href={`/communities/${community.id}`} className="text-lg text-gray-600 hover:text-black font-bold uppercase tracking-wider">
                {community.name} →
              </Link>
            </div>
            <Badge className="bg-black text-white border-0 text-sm px-4 py-2 font-bold uppercase tracking-wider">
              {activity.fitnessLevel}
            </Badge>
          </div>
        </div>

        {/* Main Info Card */}
        <Card className="bg-white border-2 border-black shadow-premium mb-12">
          <CardContent className="pt-10 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Date & Time</h3>
                  <p className="font-athletic text-2xl text-black mb-1">{formatDate(activity.dateTime)}</p>
                  <p className="text-gray-600 font-semibold">{formatTime(activity.dateTime)} • {activity.duration} min</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Location</h3>
                  <p className="font-athletic text-2xl text-black mb-1">{activity.location.name}</p>
                  <p className="text-gray-600 text-sm font-medium">{activity.location.address}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Capacity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
                      <span className="text-gray-700">{activity.rsvpCount}/{activity.capacity} Spots</span>
                      {!isFull ? (
                        <span className="text-green-600">{spotsLeft} Left</span>
                      ) : (
                        <span className="text-red-600">Full</span>
                      )}
                    </div>
                    <div className="h-3 bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${isFull ? 'bg-red-600' : 'bg-black'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Duration</h3>
                  <p className="font-athletic text-2xl text-black">{activity.duration} Minutes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="bg-white border-2 border-black shadow-premium mb-12">
          <CardContent className="pt-10 pb-10">
            <h2 className="text-3xl font-athletic text-black mb-6 uppercase">About This Activity</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {activity.description}
            </p>
          </CardContent>
        </Card>

        {/* Buddy Matching Info - Show before RSVP */}
        {activity.buddyMatchingEnabled && !hasRSVP && (
          <Card className="bg-black text-white border-2 border-black shadow-premium mb-12">
            <CardContent className="pt-10 pb-10">
              <div className="flex items-start gap-6">
                <span className="text-7xl">💙</span>
                <div className="flex-1">
                  <h3 className="text-4xl font-athletic mb-6 uppercase">Buddy Matching</h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Automatic pairing with an experienced member:
                  </p>
                  <ul className="space-y-4 text-lg mb-8">
                    <li className="flex items-center gap-4">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>Meet 15 minutes before activity</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>Introduction to the group</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>Support throughout the activity</span>
                    </li>
                  </ul>
                  <div className="bg-white/10 border-2 border-white/20 p-6 font-bold uppercase tracking-wider">
                    No opt-in required. Just RSVP.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Show Buddy Match if already RSVP'd */}
        {hasRSVP && buddyMatch && activity.buddyMatchingEnabled && (
          <div className="mb-12">
            <BuddyMatchCard
              buddy={buddyMatch}
              meetingPoint={`${activity.location.name} - Main Entrance`}
              meetingTime={getMeetingTime()}
            />
          </div>
        )}
      </div>

      {/* RSVP Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black py-6 shadow-premium-lg z-40">
        <div className="container mx-auto px-4 max-w-5xl">
          {!hasRSVP ? (
            <Button
              onClick={handleRSVP}
              disabled={isFull}
              size="lg"
              className="w-full bg-black text-white border-0 text-xl py-8 hover:bg-gray-900 shadow-premium-lg btn-premium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFull ? 'ACTIVITY FULL' : 'RSVP NOW'}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-600 p-4 text-center">
                <p className="text-green-900 font-bold text-lg uppercase tracking-wider">
                  ✓ Registered
                </p>
              </div>
              <Button
                onClick={handleCancelRSVP}
                variant="outline"
                size="lg"
                className="w-full border-2 border-black text-black hover:bg-black hover:text-white text-lg py-6 btn-premium"
              >
                CANCEL RSVP
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
