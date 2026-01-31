// Organizer Application data models based on blueprint

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface OrganizerApplication {
  applicationId: string;
  userId: string;
  clubName: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  verificationDocuments: string[];
  status: ApplicationStatus;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  rejectionReason: string | null;
  createdAt: Date;
}
