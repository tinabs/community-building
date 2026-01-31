# Community Sports Mobile App

A React Native mobile app connecting people 35+ in Dubai with running and cycling communities.

## Features

- **Phone Verification**: OTP-based authentication
- **Onboarding**: 3-step process (name, gender/age, interests)
- **Browse Communities**: Discover running and cycling communities
- **Activity Details**: View full activity info with map
- **RSVP System**: Join activities with optional buddy matching
- **Buddy Matching**: Get paired with experienced members for first-time activities
- **My Activities**: Track upcoming RSVPs
- **Profile Management**: Edit profile and buddy settings

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** (Stack + Bottom Tabs)
- **React Query** for API calls and caching
- **Zustand** for global state management
- **React Native Paper** for UI components
- **React Native Maps** for location display

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web (for testing)
npm run web
```

## Project Structure

```
mobile/
├── App.tsx                 # App entry point
├── src/
│   ├── components/        # Reusable components
│   │   ├── ActivityCard.tsx
│   │   └── CommunityCard.tsx
│   ├── data/             # Mock data
│   │   └── mockData.ts
│   ├── navigation/       # Navigation setup
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   ├── screens/          # Screen components
│   │   ├── auth/         # Auth screens
│   │   └── main/         # Main app screens
│   ├── store/            # Zustand stores
│   │   ├── useAuthStore.ts
│   │   └── useRSVPStore.ts
│   ├── theme/            # App theme
│   │   └── index.ts
│   └── types/            # TypeScript types
│       └── index.ts
└── package.json
```

## Key Screens

1. **Welcome** - App introduction
2. **Phone Verification** - OTP login
3. **Onboarding** - User setup (3 steps)
4. **Home** - Browse communities
5. **Community Detail** - Community info + activities
6. **Activity Detail** - Full activity info with RSVP
7. **My Activities** - User's upcoming RSVPs
8. **Profile** - User settings and buddy opt-in

## Mock Data

The app includes mock data for:
- 5 communities (3 running, 2 cycling)
- 8 activities across different communities
- Various fitness levels and locations

## State Management

- **Auth State** (Zustand): User authentication and onboarding status
- **RSVP State** (Zustand): User's activity RSVPs
- **React Query**: For future API integration

## Features to Implement (Backend)

When connecting to a real backend:

1. Replace mock data with API calls
2. Implement real phone verification (Twilio, AWS SNS)
3. Add push notifications (FCM/APNs)
4. Implement buddy matching algorithm
5. Add payment processing for paid activities
6. Implement real-time updates (WebSockets)

## Color Theme

- Primary: `#0891b2` (cyan-600)
- Secondary: `#06b6d4` (cyan-500)
- Accent: `#14b8a6` (teal-500)
- Background: `#ffffff`
- Surface: `#f9fafb`

## Notes

- This is a V1 implementation with mock data
- Images are loaded from Unsplash
- All API calls are mocked and return hardcoded data
- Authentication is simulated (any OTP works in dev mode)

## Next Steps

1. Connect to backend API
2. Implement real authentication
3. Add image upload functionality
4. Implement payment system
5. Add push notifications
6. Implement chat/messaging (V2)
7. Add activity reviews and photos (V2)
