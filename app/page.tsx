import { redirect } from 'next/navigation';

export default function RootPage() {
  // In a real app, check if user is authenticated and has completed onboarding
  // For now, redirect to welcome page to start onboarding flow
  // If user is authenticated, redirect to /home instead
  
  redirect('/welcome');
}
