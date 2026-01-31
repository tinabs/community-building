// User service
// Based on blueprint API calls

export async function getUser(userId: string) {
  // Placeholder - will be implemented
  throw new Error('Not implemented');
}

export async function updateUser(
  userId: string,
  data: { profile?: unknown; preferences?: unknown }
) {
  // Placeholder - will be implemented
  throw new Error('Not implemented');
}

export async function completeOnboarding(
  userId: string,
  data: { gender: string; age: number; vibes: string[] }
) {
  // Placeholder - will be implemented
  throw new Error('Not implemented');
}

export async function connectStrava(userId: string, authCode: string) {
  // Placeholder - will be implemented
  throw new Error('Not implemented');
}
