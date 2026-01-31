'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BuddyUser } from '@/lib/data/mockData';

interface BuddyMatchCardProps {
  buddy: BuddyUser;
  meetingPoint: string;
  meetingTime: string;
}

export function BuddyMatchCard({ buddy, meetingPoint, meetingTime }: BuddyMatchCardProps) {
  return (
    <Card className="bg-white border-2 border-black shadow-premium overflow-hidden">
      <CardHeader className="bg-black text-white py-4 border-b-2 border-black">
        <CardTitle className="flex items-center gap-3 text-xl uppercase font-athletic tracking-wider">
          <span className="text-3xl">💙</span>
          <span>Your Buddy</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-6">
        {/* Buddy Profile */}
        <div className="flex items-start gap-4 mb-6 pb-6 border-b-2 border-gray-200">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-black flex-shrink-0">
            <Image
              src={buddy.photoUrl}
              alt={buddy.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-athletic text-black mb-2 uppercase">{buddy.name}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="text-xs py-1 bg-gray-100 text-black font-bold uppercase tracking-wider">
                {buddy.fitnessLevel}
              </Badge>
              <Badge variant="outline" className="text-xs py-1 border-black text-black font-bold uppercase tracking-wider">
                {buddy.totalActivities} Activities
              </Badge>
            </div>
            <p className="text-sm text-gray-700 leading-snug font-medium">{buddy.bio}</p>
          </div>
        </div>

        {/* Interests */}
        <div className="mb-6 pb-6 border-b-2 border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {buddy.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="text-xs py-1 border-black text-black font-semibold">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Meeting Info - Compact */}
        <div className="space-y-3 mb-6">
          <div className="bg-gray-50 border-2 border-gray-200 p-3">
            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-black text-sm uppercase tracking-wider mb-1">Meeting Point</h4>
                <p className="text-xs text-gray-700 font-medium">{meetingPoint}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 p-3">
            <div className="flex items-start gap-3">
              <span className="text-xl">⏰</span>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-black text-sm uppercase tracking-wider mb-1">Meet Time</h4>
                <p className="text-xs text-gray-700 font-medium">{meetingTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips - Nike Style */}
        <div className="bg-black text-white p-4">
          <h4 className="font-athletic text-sm mb-3 uppercase tracking-wider">Quick Tips</h4>
          <ul className="text-xs space-y-2 font-medium">
            <li className="flex items-center gap-2">
              <span className="text-red-600">•</span>
              <span>Arrive 10 min early</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600">•</span>
              <span>Look for community gear</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600">•</span>
              <span>Have fun and ask questions</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
