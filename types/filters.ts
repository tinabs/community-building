// Filter state models based on blueprint

export interface FilterState {
  neighborhoods: string[];
  daysOfWeek: string[];
  timeOfDay: string[]; // 'morning', 'afternoon', 'evening'
  fitnessLevels: string[];
  genderPreference: string;
}
