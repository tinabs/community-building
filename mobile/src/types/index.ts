// Core data types for the app

export type Vibe = 'running' | 'cycling';
export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  phone: string;
  name: string;
  age: number;
  gender: Gender;
  photoUrl?: string;
  bio?: string;
  vibes: Vibe[];
  isBuddy: boolean;
  createdAt: Date;
}

export interface Community {
  id: string;
  name: string;
  vibe: Vibe;
  description: string;
  location: {
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  fitnessLevels: FitnessLevel[];
  memberCount: number;
  organizerId: string;
}

export interface Activity {
  id: string;
  communityId: string;
  title: string;
  description: string;
  dateTime: Date;
  duration: number; // minutes
  location: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  capacity: number;
  rsvpCount: number;
  fitnessLevel: FitnessLevel;
  buddyMatchingEnabled: boolean;
}

export interface RSVP {
  id: string;
  activityId: string;
  userId: string;
  requestedBuddy: boolean;
  buddyMatchId?: string;
  createdAt: Date;
}

export interface BuddyMatch {
  id: string;
  activityId: string;
  buddyUserId: string;
  newcomerUserId: string;
  status: 'pending' | 'accepted' | 'completed';
}
