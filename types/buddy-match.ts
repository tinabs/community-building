// Buddy Match data models based on blueprint

export type BuddyMatchStatus = 'pending' | 'accepted' | 'declined' | 'completed';

export interface BuddyMatch {
  matchId: string;
  activityId: string;
  buddyUserId: string;
  newcomerUserId: string;
  status: BuddyMatchStatus;
  createdAt: Date;
  acceptedAt: Date | null;
  completedAt: Date | null;
}
