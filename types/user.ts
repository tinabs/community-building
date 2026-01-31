// User data models based on blueprint

export type UserRole = 'participant' | 'organizer' | 'admin';

export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';

export type Vibe = 'running' | 'cycling';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  firstName: string;
  lastName: string;
  gender: Gender;
  age: number;
  photoUrl: string;
  bio: string;
  iceBreakers: {
    why_join: string;
    interests: string;
    fun_fact: string;
  };
  location: {
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export interface UserPreferences {
  vibes: Vibe[];
  isBuddy: boolean;
  buddyMaxPerEvent: number;
  notifications: {
    pushEnabled: boolean;
    activityReminders: boolean;
    buddyMatches: boolean;
    newActivities: boolean;
  };
}

export interface ConnectedApps {
  stravaConnected: boolean;
  stravaUserId: string | null;
  whoopConnected: boolean;
  whoopUserId: string | null;
}

export interface User {
  userId: string;
  phoneNumber: string;
  phoneVerified: boolean;
  role: UserRole;
  profile: UserProfile;
  preferences: UserPreferences;
  connectedApps: ConnectedApps;
  createdAt: Date;
  updatedAt: Date;
}
