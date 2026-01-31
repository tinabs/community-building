// Community data models based on blueprint

import type { Vibe } from './user';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export type GenderPreference = 'mixed' | 'male-only' | 'female-only';

export type CommunityStatus = 'pending' | 'active' | 'suspended';

export interface CommunityLocation {
  neighborhood: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Community {
  communityId: string;
  organizerId: string;
  name: string;
  vibe: Vibe;
  description: string;
  location: CommunityLocation;
  images: string[];
  fitnessLevels: FitnessLevel[];
  genderPreference: GenderPreference;
  schedule: string;
  memberCount: number; // computed
  status: CommunityStatus;
  createdAt: Date;
  updatedAt: Date;
}
