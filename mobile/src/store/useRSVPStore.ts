import { create } from 'zustand';
import { RSVP } from '../types';

interface RSVPState {
  rsvps: RSVP[];
  addRSVP: (rsvp: RSVP) => void;
  removeRSVP: (activityId: string) => void;
  hasRSVP: (activityId: string) => boolean;
  getRSVPsForUser: (userId: string) => RSVP[];
}

export const useRSVPStore = create<RSVPState>((set, get) => ({
  rsvps: [],
  addRSVP: (rsvp) => set((state) => ({ rsvps: [...state.rsvps, rsvp] })),
  removeRSVP: (activityId) =>
    set((state) => ({
      rsvps: state.rsvps.filter((r) => r.activityId !== activityId),
    })),
  hasRSVP: (activityId) => get().rsvps.some((r) => r.activityId === activityId),
  getRSVPsForUser: (userId) => get().rsvps.filter((r) => r.userId === userId),
}));
