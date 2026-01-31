'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section - Nike Bold Style */}
          <div className="mb-20">
            <div className="max-w-4xl">
              <h1 className="text-7xl md:text-9xl font-athletic text-black mb-8 leading-none">
                JUST
                <br />
                <span className="text-red-600">START</span>
                <br />
                RUNNING.
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-2xl font-medium leading-tight">
                Join Dubai's most active sports community. 
                <br />
                Connect with athletes. Train together. Achieve more.
              </p>
              <Link href="/phone-verification">
                <Button size="lg" className="bg-black text-white border-0 text-lg px-16 py-8 hover:bg-gray-900 shadow-premium-lg btn-premium">
                  GET STARTED
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid - Minimal Nike Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-50 p-10 border-2 border-transparent hover:border-black transition-all">
              <div className="text-6xl mb-6">🏃</div>
              <h3 className="text-2xl font-athletic text-black mb-4 uppercase">Communities</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover running and cycling groups in your neighborhood. From beginners to pros.
              </p>
            </div>

            <div className="bg-gray-50 p-10 border-2 border-transparent hover:border-black transition-all">
              <div className="text-6xl mb-6">💙</div>
              <h3 className="text-2xl font-athletic text-black mb-4 uppercase">Buddy System</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatic buddy matching for your first event. Never train alone.
              </p>
            </div>

            <div className="bg-gray-50 p-10 border-2 border-transparent hover:border-black transition-all">
              <div className="text-6xl mb-6">📅</div>
              <h3 className="text-2xl font-athletic text-black mb-4 uppercase">Easy RSVP</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse activities and join with one tap. Track your progress effortlessly.
              </p>
            </div>
          </div>

          {/* Stats - Nike Style */}
          <div className="bg-black text-white p-16 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-athletic mb-4 uppercase">
                Trusted By Athletes
              </h2>
              <p className="text-xl text-gray-400">Join hundreds of active members across Dubai</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="text-7xl font-athletic text-red-600 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-7xl font-athletic text-white mb-2">
                  50+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Communities</div>
              </div>
              <div className="text-center">
                <div className="text-7xl font-athletic text-red-600 mb-2">
                  200+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Weekly Activities</div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-2xl text-black font-athletic mb-8 uppercase">
              Ready to start?
            </p>
            <Link href="/phone-verification">
              <Button size="lg" className="bg-red-600 text-white border-0 text-lg px-16 py-8 hover:bg-red-700 shadow-premium-lg btn-premium">
                JOIN NOW →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
