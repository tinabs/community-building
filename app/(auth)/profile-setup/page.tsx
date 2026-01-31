'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OnboardingProgress } from '@/components/shared/OnboardingProgress';
import type { Gender } from '@/types/user';

const ONBOARDING_STEPS = [
  { label: 'Phone', emoji: '✓' },
  { label: 'Preferences', emoji: '✓' },
  { label: 'Profile', emoji: '👤' },
];

const GENDERS: { value: Gender; label: string; emoji: string }[] = [
  { value: 'male', label: 'Male', emoji: '👨' },
  { value: 'female', label: 'Female', emoji: '👩' },
  { value: 'non-binary', label: 'Non-binary', emoji: '🧑' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say', emoji: '😊' },
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [bio, setBio] = useState('');
  const [whyJoin, setWhyJoin] = useState('');
  const [interests, setInterests] = useState('');
  const [funFact, setFunFact] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!firstName || !lastName) {
      alert('Please enter your full name! 📝');
      return;
    }
    if (!age || parseInt(age) < 16 || parseInt(age) > 100) {
      alert('Please enter a valid age (16-100)! 🎂');
      return;
    }
    if (!gender) {
      alert('Please select your gender! 🎯');
      return;
    }
    if (!bio || bio.length < 20) {
      alert('Please write a bio (at least 20 characters)! ✍️');
      return;
    }
    if (!whyJoin) {
      alert('Please tell us why you want to join! 💭');
      return;
    }

    setIsLoading(true);

    console.log({
      firstName,
      lastName,
      age: parseInt(age),
      gender,
      bio,
      photoUrl,
      iceBreakers: { why_join: whyJoin, interests, fun_fact: funFact },
    });

    setTimeout(() => {
      setIsLoading(false);
      router.push('/home');
    }, 1500);
  };

  const progress = Math.round(
    ((firstName && lastName ? 15 : 0) +
      (age ? 15 : 0) +
      (gender ? 15 : 0) +
      (bio.length >= 20 ? 25 : 0) +
      (whyJoin ? 20 : 0) +
      (interests ? 5 : 0) +
      (funFact ? 5 : 0))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <OnboardingProgress currentStep={3} totalSteps={3} steps={ONBOARDING_STEPS} />

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-3xl font-bold mb-2">Almost There!</h1>
          <p className="text-muted-foreground">
            Let's create your profile so others can get to know you! 🙌
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>👤</span>
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>Tell us who you are!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age * 🎂</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  min="16"
                  max="100"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {GENDERS.map((g) => (
                    <div
                      key={g.value}
                      onClick={() => setGender(g.value)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center ${
                        gender === g.value
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-gray-200 hover:border-primary/30'
                      }`}
                    >
                      <div className="text-3xl mb-1">{g.emoji}</div>
                      <div className="font-medium text-sm">{g.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About You */}
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>✍️</span>
                <span>About You</span>
              </CardTitle>
              <CardDescription>Share a bit about yourself!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio * 📝</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself... What do you love about sports? What are your goals? What makes you unique?"
                  rows={4}
                  className="resize-none"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Minimum 20 characters</span>
                  <span className={bio.length >= 20 ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
                    {bio.length}/150 {bio.length >= 20 && '✓'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ice Breakers */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🧊</span>
                <span>Ice Breakers</span>
              </CardTitle>
              <CardDescription className="text-purple-800">
                Help your future buddy get to know you! These make great conversation starters 💬
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whyJoin" className="flex items-center gap-2">
                  <span>💭</span>
                  <span>Why do you want to join our community? *</span>
                </Label>
                <Textarea
                  id="whyJoin"
                  value={whyJoin}
                  onChange={(e) => setWhyJoin(e.target.value)}
                  placeholder="I'm new to Dubai and looking to make friends while staying active..."
                  rows={3}
                  className="bg-white/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests" className="flex items-center gap-2">
                  <span>🎨</span>
                  <span>What are your other interests?</span>
                </Label>
                <Textarea
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Coffee, photography, hiking, trying new restaurants..."
                  rows={2}
                  className="bg-white/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="funFact" className="flex items-center gap-2">
                  <span>🎉</span>
                  <span>Share a fun fact about yourself!</span>
                </Label>
                <Textarea
                  id="funFact"
                  value={funFact}
                  onChange={(e) => setFunFact(e.target.value)}
                  placeholder="I once ran a marathon dressed as a superhero!"
                  rows={2}
                  className="bg-white/80"
                />
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          <div className="bg-white rounded-lg p-4 border-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm font-bold text-primary">{progress}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-cyan-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress === 100 && (
              <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                <span>✨</span>
                <span className="font-medium">Perfect! You're all set!</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full text-lg py-6"
            size="lg"
            disabled={isLoading || progress < 90}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Creating your profile...
              </span>
            ) : (
              'Complete Setup & Start Exploring! 🎉'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
