import { Community, Activity } from '../types';

// Mock communities
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
    organizerId: 'org1',
  },
  {
    id: 'c2',
    name: 'JBR Beach Joggers',
    vibe: 'running',
    description: 'Beachside running group meeting every Saturday morning. Enjoy the sunrise!',
    location: {
      neighborhood: 'Jumeirah Beach Residence',
      coordinates: { lat: 25.0767, lng: 55.1323 },
    },
    images: ['https://images.unsplash.com/photo-1483721310020-03333e577078?w=800'],
    fitnessLevels: ['beginner', 'intermediate'],
    memberCount: 32,
    organizerId: 'org2',
  },
  {
    id: 'c3',
    name: 'Desert Trail Runners',
    vibe: 'running',
    description: 'Off-road trail running in the desert. For experienced runners seeking adventure.',
    location: {
      neighborhood: 'Al Qudra',
      coordinates: { lat: 24.8607, lng: 55.2096 },
    },
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800'],
    fitnessLevels: ['intermediate', 'advanced'],
    memberCount: 28,
    organizerId: 'org3',
  },
  {
    id: 'c4',
    name: 'Dubai Cycling Club',
    vibe: 'cycling',
    description: 'Road cycling group exploring Dubai and beyond. Weekly rides, all paces.',
    location: {
      neighborhood: 'Dubai Sports City',
      coordinates: { lat: 25.0390, lng: 55.2096 },
    },
    images: ['https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800'],
    fitnessLevels: ['beginner', 'intermediate', 'advanced'],
    memberCount: 62,
    organizerId: 'org4',
  },
  {
    id: 'c5',
    name: 'Al Qudra Cyclists',
    vibe: 'cycling',
    description: 'Early morning rides on the famous Al Qudra cycle track. Peaceful and scenic.',
    location: {
      neighborhood: 'Al Qudra',
      coordinates: { lat: 24.8807, lng: 55.2196 },
    },
    images: ['https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800'],
    fitnessLevels: ['intermediate', 'advanced'],
    memberCount: 38,
    organizerId: 'org5',
  },
];

// Mock activities
export const mockActivities: Activity[] = [
  // Dubai Marina Runners activities
  {
    id: 'a1',
    communityId: 'c1',
    title: 'Saturday Morning 5K',
    description: 'Easy 5K run along the Marina Walk. Perfect for beginners!',
    dateTime: new Date(2026, 1, 8, 6, 0), // Feb 8, 2026, 6:00 AM
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
    description: 'High-intensity interval training for intermediate/advanced runners.',
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
  // JBR Beach Joggers activities
  {
    id: 'a3',
    communityId: 'c2',
    title: 'Sunrise Beach Run',
    description: 'Beautiful sunrise run along JBR beach. 3K easy pace.',
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
    communityId: 'c2',
    title: 'Weekend Long Run',
    description: '10K along the beach and back. Steady pace, stops for photos!',
    dateTime: new Date(2026, 1, 14, 6, 0),
    duration: 75,
    location: {
      name: 'JBR Beach',
      address: 'The Walk, JBR, Dubai',
      coordinates: { lat: 25.0767, lng: 55.1323 },
    },
    capacity: 15,
    rsvpCount: 7,
    fitnessLevel: 'intermediate',
    buddyMatchingEnabled: true,
  },
  // Desert Trail Runners activities
  {
    id: 'a5',
    communityId: 'c3',
    title: 'Al Qudra Trail 15K',
    description: 'Challenging trail run through the desert. Bring water!',
    dateTime: new Date(2026, 1, 13, 6, 0),
    duration: 90,
    location: {
      name: 'Al Qudra Cycle Track',
      address: 'Al Qudra Road, Dubai',
      coordinates: { lat: 24.8607, lng: 55.2096 },
    },
    capacity: 10,
    rsvpCount: 6,
    fitnessLevel: 'advanced',
    buddyMatchingEnabled: false,
  },
  // Dubai Cycling Club activities
  {
    id: 'a6',
    communityId: 'c4',
    title: 'Easy 30K Ride',
    description: 'Social ride around Sports City. Great for beginners.',
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
  {
    id: 'a7',
    communityId: 'c4',
    title: 'Dubai to Hatta Challenge',
    description: '100K ride to Hatta and back. For experienced cyclists only.',
    dateTime: new Date(2026, 1, 15, 5, 0),
    duration: 300,
    location: {
      name: 'Dubai Sports City',
      address: 'Sports City, Dubai',
      coordinates: { lat: 25.0390, lng: 55.2096 },
    },
    capacity: 15,
    rsvpCount: 12,
    fitnessLevel: 'advanced',
    buddyMatchingEnabled: false,
  },
  // Al Qudra Cyclists activities
  {
    id: 'a8',
    communityId: 'c5',
    title: 'Al Qudra Loop 50K',
    description: 'Classic Al Qudra loop ride. Intermediate pace.',
    dateTime: new Date(2026, 1, 10, 5, 30),
    duration: 120,
    location: {
      name: 'Al Qudra Cycle Track',
      address: 'Al Qudra Road, Dubai',
      coordinates: { lat: 24.8807, lng: 55.2196 },
    },
    capacity: 20,
    rsvpCount: 14,
    fitnessLevel: 'intermediate',
    buddyMatchingEnabled: true,
  },
];

// Helper function to get activities for a community
export const getActivitiesForCommunity = (communityId: string): Activity[] => {
  return mockActivities.filter(activity => activity.communityId === communityId);
};

// Helper function to get community by ID
export const getCommunityById = (id: string): Community | undefined => {
  return mockCommunities.find(community => community.id === id);
};

// Helper function to get activity by ID
export const getActivityById = (id: string): Activity | undefined => {
  return mockActivities.find(activity => activity.id === id);
};
