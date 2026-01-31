'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { OnboardingProgress } from '@/components/shared/OnboardingProgress';

const ONBOARDING_STEPS = [
  { label: 'Phone', emoji: '📱' },
  { label: 'Preferences', emoji: '⚡' },
  { label: 'Profile', emoji: '👤' },
];

export default function PhoneVerificationPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/onboarding');
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <OnboardingProgress currentStep={1} totalSteps={3} steps={ONBOARDING_STEPS} />

        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">📱</div>
          <h1 className="text-3xl font-bold mb-2">Let's Verify Your Number!</h1>
          <p className="text-muted-foreground">
            {!otpSent 
              ? "We'll send you a quick verification code to keep your account secure"
              : "Enter the 6-digit code we just sent you"}
          </p>
        </div>

        <Card className="shadow-2xl border-2">
          <CardHeader>
            <CardTitle>{otpSent ? '🔐 Enter Verification Code' : '📞 Your Phone Number'}</CardTitle>
            <CardDescription>
              {otpSent ? "Check your messages - it should arrive in seconds!" : "We'll text you a verification code"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Phone Number Input */}
            {!otpSent && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">Phone Number</Label>
                <div className="flex gap-3">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="text-lg py-6"
                    autoFocus
                  />
                  <Button onClick={handleSendOTP} disabled={isLoading} size="lg" className="px-8">
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span> Sending...
                      </span>
                    ) : (
                      'Send Code 🚀'
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>💡</span>
                  <span>Make sure you can receive SMS messages</span>
                </p>
              </div>
            )}

            {/* OTP Input */}
            {otpSent && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="otp" className="text-base">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="● ● ● ● ● ●"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-3xl tracking-[1em] font-bold py-6"
                    autoFocus
                  />
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-muted-foreground">
                      Didn't receive it?
                    </p>
                    <button
                      onClick={handleSendOTP}
                      className="text-primary hover:underline font-medium"
                      disabled={isLoading}
                    >
                      Resend Code 🔄
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={handleVerifyOTP} 
                  className="w-full text-lg py-6" 
                  size="lg"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> Verifying...
                    </span>
                  ) : (
                    'Verify & Continue ✨'
                  )}
                </Button>
              </>
            )}

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-blue-900 flex items-center gap-2">
                <span>🔒</span>
                <span>Your privacy matters! We'll only use your number for account security.</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
