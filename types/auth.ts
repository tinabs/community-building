// Authentication state models

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: unknown | null; // Will be User type
  authToken: string | null;
  loading: boolean;
}

export interface AppState {
  notificationPermission: boolean;
  locationPermission: boolean;
  calendarPermission: boolean;
  unreadNotificationCount: number;
}
