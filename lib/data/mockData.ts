// Mock data for web app
import type { Vibe, FitnessLevel } from '@/types';

export interface Community {
  id: string;
  name: string;
  vibe: Vibe;
  description: string;
  location: {
    neighborhood: string;
    coordinates: { lat: number; lng: number };
  };
  images: string[];
  fitnessLevels: FitnessLevel[];
  memberCount: number;
}

export interface Activity {
  id: string;
  communityId: string;
  title: string;
  description: string;
  dateTime: Date;
  duration: number;
  location: {
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  capacity: number;
  rsvpCount: number;
  fitnessLevel: FitnessLevel;
  buddyMatchingEnabled: boolean;
}

export interface BuddyUser {
  id: string;
  name: string;
  photoUrl: string;
  bio: string;
  interests: string[];
  fitnessLevel: FitnessLevel;
  totalActivities: number;
  memberSince: string;
}

export const mockCommunities: Community[] = [
  {
    id: 'c1',
    name: 'Dubai Marina Runners',
    vibe: 'running',
    description: 'Morning runs along the beautiful Dubai Marina. All fitness levels welcome!',
    location: {
      neighborhood: 'Dubai Marina',
      coordinates: { lat: 25.0801, lng: 55.1396 },
    },
    images: ['https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800'],
    fitnessLevels: ['beginner', 'intermediate', 'advanced'],
    memberCount: 45,
  },
  {
    id: 'c2',
    name: 'JBR Beach Joggers',
    vibe: 'running',
    description: 'Beachside running group meeting every Saturday morning.',
    location: {
      neighborhood: 'Jumeirah Beach Residence',
      coordinates: { lat: 25.0767, lng: 55.1323 },
    },
    images: ['https://images.unsplash.com/photo-1483721310020-03333e577078?w=800'],
    fitnessLevels: ['beginner', 'intermediate'],
    memberCount: 32,
  },
  {
    id: 'c3',
    name: 'Desert Trail Runners',
    vibe: 'running',
    description: 'Off-road trail running in the desert.',
    location: {
      neighborhood: 'Al Qudra',
      coordinates: { lat: 24.8607, lng: 55.2096 },
    },
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800'],
    fitnessLevels: ['intermediate', 'advanced'],
    memberCount: 28,
  },
  {
    id: 'c4',
    name: 'Dubai Cycling Club',
    vibe: 'cycling',
    description: 'Road cycling group exploring Dubai and beyond.',
    location: {
      neighborhood: 'Dubai Sports City',
      coordinates: { lat: 25.0390, lng: 55.2096 },
    },
    images: ['https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800'],
    fitnessLevels: ['beginner', 'intermediate', 'advanced'],
    memberCount: 62,
  },
  {
    id: 'c5',
    name: 'Al Qudra Cyclists',
    vibe: 'cycling',
    description: 'Early morning rides on the famous Al Qudra cycle track.',
    location: {
      neighborhood: 'Al Qudra',
      coordinates: { lat: 24.8807, lng: 55.2196 },
    },
    images: ['https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800'],
    fitnessLevels: ['intermediate', 'advanced'],
    memberCount: 38,
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    communityId: 'c1',
    title: 'Saturday Morning 5K',
    description: 'Easy 5K run along the Marina Walk. Perfect for beginners!',
    dateTime: new Date(2026, 1, 8, 6, 0),
    duration: 45,
    location: {
      name: 'Marina Walk',
      address: 'Dubai Marina Walk, Dubai',
      coordinates: { lat: 25.0801, lng: 55.1396 },
    },
    capacity: 15,
    rsvpCount: 8,
    fitnessLevel: 'beginner',
    buddyMatchingEnabled: true,
  },
  {
    id: 'a2',
    communityId: 'c1',
    title: 'Interval Training Session',
    description: 'High-intensity interval training.',
    dateTime: new Date(2026, 1, 11, 6, 30),
    duration: 60,
    location: {
      name: 'Marina Walk',
      address: 'Dubai Marina Walk, Dubai',
      coordinates: { lat: 25.0801, lng: 55.1396 },
    },
    capacity: 12,
    rsvpCount: 10,
    fitnessLevel: 'intermediate',
    buddyMatchingEnabled: true,
  },
  {
    id: 'a3',
    communityId: 'c2',
    title: 'Sunrise Beach Run',
    description: 'Beautiful sunrise run along JBR beach.',
    dateTime: new Date(2026, 1, 7, 6, 0),
    duration: 30,
    location: {
      name: 'JBR Beach',
      address: 'The Walk, JBR, Dubai',
      coordinates: { lat: 25.0767, lng: 55.1323 },
    },
    capacity: 20,
    rsvpCount: 12,
    fitnessLevel: 'beginner',
    buddyMatchingEnabled: true,
  },
  {
    id: 'a4',
    communityId: 'c4',
    title: 'Easy 30K Ride',
    description: 'Social ride around Sports City.',
    dateTime: new Date(2026, 1, 9, 6, 30),
    duration: 90,
    location: {
      name: 'Dubai Sports City',
      address: 'Sports City, Dubai',
      coordinates: { lat: 25.0390, lng: 55.2096 },
    },
    capacity: 25,
    rsvpCount: 18,
    fitnessLevel: 'beginner',
    buddyMatchingEnabled: true,
  },
];

export const mockBuddies: BuddyUser[] = [
  {
    id: 'b1',
    name: 'Sarah Ahmed',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Love meeting new people and exploring Dubai! Been running for 3 years.',
    interests: ['Coffee', 'Photography', 'Travel'],
    fitnessLevel: 'intermediate',
    totalActivities: 47,
    memberSince: '2024',
  },
  {
    id: 'b2',
    name: 'Omar Hassan',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Always happy to show newcomers the best routes in Dubai!',
    interests: ['Cycling', 'Tech', 'Hiking'],
    fitnessLevel: 'intermediate',
    totalActivities: 62,
    memberSince: '2023',
  },
  {
    id: 'b3',
    name: 'Layla Mansoor',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Fitness enthusiast and community builder. Let\'s run together!',
    interests: ['Wellness', 'Cooking', 'Beach runs'],
    fitnessLevel: 'advanced',
    totalActivities: 89,
    memberSince: '2023',
  },
  {
    id: 'b4',
    name: 'James Wilson',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'New to Dubai, love making friends through sports!',
    interests: ['Running', 'Coffee', 'Brunch'],
    fitnessLevel: 'beginner',
    totalActivities: 15,
    memberSince: '2025',
  },
];

export const getCommunityById = (id: string) => mockCommunities.find(c => c.id === id);
export const getActivityById = (id: string) => mockActivities.find(a => a.id === id);
export const getActivitiesForCommunity = (communityId: string) => 
  mockActivities.filter(a => a.communityId === communityId);

// Get a random buddy match
export const getRandomBuddy = (): BuddyUser => {
  const randomIndex = Math.floor(Math.random() * mockBuddies.length);
  return mockBuddies[randomIndex];
};
