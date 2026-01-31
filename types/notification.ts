// Notification data models based on blueprint

export type NotificationType =
  | 'buddy_match'
  | 'activity_reminder'
  | 'rsvp_confirmation'
  | 'activity_cancelled'
  | 'organizer_approved'
  | 'waitlist_promotion'
  | 'new_activity';

export interface Notification {
  notificationId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, unknown>; // type-specific payload
  read: boolean;
  createdAt: Date;
}
