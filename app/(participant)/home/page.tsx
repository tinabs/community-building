'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockCommunities } from '@/lib/data/mockData';
import type { Vibe } from '@/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVibe, setSelectedVibe] = useState<'all' | Vibe>('all');

  const filteredCommunities = mockCommunities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVibe = selectedVibe === 'all' || community.vibe === selectedVibe;
    return matchesSearch && matchesVibe;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section - Nike Style */}
        <div className="mb-16">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-athletic text-black mb-6 leading-none">
              JUST DO IT.
              <br />
              <span className="text-red-600">TOGETHER.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl font-medium">
              Join Dubai's most active running and cycling communities. 
              Connect. Train. Achieve.
            </p>
          </div>
        </div>

        {/* Search & Filters - Minimal Nike Style */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-sm border-2 border-black p-6 shadow-premium">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 text-lg border-2 border-gray-300 focus:border-black rounded-sm font-medium"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedVibe === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedVibe('all')}
                className={selectedVibe === 'all' ? 'bg-black text-white border-0 btn-premium' : 'border-2 border-black text-black hover:bg-black hover:text-white btn-premium'}
              >
                ALL
              </Button>
              <Button
                variant={selectedVibe === 'running' ? 'default' : 'outline'}
                onClick={() => setSelectedVibe('running')}
                className={selectedVibe === 'running' ? 'bg-black text-white border-0 btn-premium' : 'border-2 border-black text-black hover:bg-black hover:text-white btn-premium'}
              >
                RUNNING
              </Button>
              <Button
                variant={selectedVibe === 'cycling' ? 'default' : 'outline'}
                onClick={() => setSelectedVibe('cycling')}
                className={selectedVibe === 'cycling' ? 'bg-black text-white border-0 btn-premium' : 'border-2 border-black text-black hover:bg-black hover:text-white btn-premium'}
              >
                CYCLING
              </Button>
            </div>
          </div>
        </div>

        {/* Communities Grid - Nike Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommunities.map((community, index) => (
            <Link
              key={community.id}
              href={`/communities/${community.id}`}
              className="group block"
            >
              <div className="bg-white border-2 border-transparent hover:border-black rounded-sm overflow-hidden shadow-premium card-hover">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={community.images[0]}
                    alt={community.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Vibe Badge - Minimal */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-black border-0 font-bold uppercase text-xs tracking-wider px-3 py-1">
                      {community.vibe}
                    </Badge>
                  </div>

                  {/* Community Name - Bold */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-athletic text-white mb-1">
                      {community.name.toUpperCase()}
                    </h3>
                    <p className="text-sm text-white/90 uppercase tracking-wider font-semibold">
                      {community.location.neighborhood}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                    {community.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-athletic text-black">{community.memberCount}</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Members</span>
                    </div>
                    
                    <div className="flex gap-1">
                      {community.fitnessLevels.slice(0, 3).map((level) => (
                        <Badge key={level} variant="secondary" className="text-xs capitalize font-semibold bg-gray-100 text-gray-700">
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-black text-white border-0 hover:bg-gray-900 rounded-sm btn-premium py-6"
                  >
                    EXPLORE →
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-20">
            <div className="text-7xl mb-4 opacity-30">🔍</div>
            <h3 className="text-2xl font-athletic text-black mb-2">NO RESULTS</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Call to Action - Nike Style */}
        {filteredCommunities.length > 0 && (
          <div className="mt-20 bg-black text-white rounded-sm p-16 text-center">
            <h2 className="text-4xl md:text-6xl font-athletic mb-6 leading-tight">
              CAN'T FIND YOUR
              <br />
              <span className="text-red-600">PERFECT MATCH?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create your own community and lead the movement.
            </p>
            <Button className="bg-red-600 text-white border-0 hover:bg-red-700 text-lg px-12 py-7 shadow-premium-lg btn-premium">
              CREATE COMMUNITY
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
