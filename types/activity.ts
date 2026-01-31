// Activity data models based on blueprint

import type { FitnessLevel } from './user';
import type { GenderPreference } from './community';

export type ActivityStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface ActivityLocation {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Activity {
  activityId: string;
  communityId: string;
  organizerId: string;
  title: string;
  description: string;
  dateTime: Date;
  duration: number; // minutes
  location: ActivityLocation;
  capacity: number;
  fitnessLevel: FitnessLevel;
  genderPreference: GenderPreference;
  buddyMatchingEnabled: boolean;
  isPaid: boolean;
  price: number; // AED
  rsvpCount: number; // computed
  status: ActivityStatus;
  createdAt: Date;
  updatedAt: Date;
}
