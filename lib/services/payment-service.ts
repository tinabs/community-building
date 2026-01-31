// Payment service
// Based on blueprint API calls

export async function createPaymentIntent(
  activityId: string,
  userId: string,
  amount: number
) {
  // Placeholder - will be implemented
  throw new Error('Not implemented');
}

export async function confirmPayment(
  paymentIntentId: string,
  rsvpId: string
) {
  // Placeholder - will be implemented
  throw new Error('Not implemented');
}

export async function processRefund(
  paymentId: string,
  rsvpId: string,
  reason: string
) {
  // Placeholder - will be implemented
  throw new Error('Not implemented');
}
