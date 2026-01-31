// RSVP data models based on blueprint

export type RSVPStatus = 'confirmed' | 'cancelled' | 'waitlist';

export type PaymentStatus = 'pending' | 'completed' | 'refunded';

export type AttendanceStatus = 'pending' | 'attended' | 'no-show';

export interface RSVP {
  rsvpId: string;
  activityId: string;
  userId: string;
  status: RSVPStatus;
  requestedBuddy: boolean;
  buddyMatchId: string | null;
  paymentStatus: PaymentStatus | null;
  paymentId: string | null;
  attendanceStatus: AttendanceStatus;
  createdAt: Date;
  updatedAt: Date;
}
