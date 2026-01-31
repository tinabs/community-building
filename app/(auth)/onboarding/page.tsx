'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { OnboardingProgress } from '@/components/shared/OnboardingProgress';
import type { Vibe, FitnessLevel } from '@/types/user';

const ONBOARDING_STEPS = [
  { label: 'Phone', emoji: '✓' },
  { label: 'Preferences', emoji: '⚡' },
  { label: 'Profile', emoji: '👤' },
];

const VIBES: { value: Vibe; label: string; emoji: string; description: string }[] = [
  { value: 'running', label: 'Running', emoji: '🏃', description: 'Hit the pavement!' },
  { value: 'cycling', label: 'Cycling', emoji: '🚴', description: 'Pedal power!' },
];

const FITNESS_LEVELS: { value: FitnessLevel; label: string; emoji: string; description: string }[] = [
  { value: 'beginner', label: 'Beginner', emoji: '🌱', description: 'Just starting out or getting back into it' },
  { value: 'intermediate', label: 'Intermediate', emoji: '💪', description: 'Regular exercise, comfortable pace' },
  { value: 'advanced', label: 'Advanced', emoji: '🔥', description: 'High intensity, competitive training' },
];

const NEIGHBORHOODS = [
  { name: 'Dubai Marina', emoji: '🏙️' },
  { name: 'Downtown Dubai', emoji: '🏢' },
  { name: 'JBR', emoji: '🏖️' },
  { name: 'Business Bay', emoji: '💼' },
  { name: 'Al Barsha', emoji: '🏘️' },
  { name: 'Arabian Ranches', emoji: '🌳' },
  { name: 'Sports City', emoji: '⚽' },
  { name: 'Al Qudra', emoji: '🏜️' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedVibes, setSelectedVibes] = useState<Vibe[]>([]);
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel | null>(null);
  const [neighborhood, setNeighborhood] = useState('');
  const [wantsBuddy, setWantsBuddy] = useState(true);

  const handleVibeToggle = (vibe: Vibe) => {
    setSelectedVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    );
  };

  const handleContinue = () => {
    if (selectedVibes.length === 0) {
      alert('Please select at least one activity type! 🎯');
      return;
    }
    if (!fitnessLevel) {
      alert('Please select your fitness level! 💪');
      return;
    }
    if (!neighborhood) {
      alert('Please select your neighborhood! 📍');
      return;
    }

    console.log({ selectedVibes, fitnessLevel, neighborhood, wantsBuddy });
    router.push('/profile-setup');
  };

  const progress = (
    (selectedVibes.length > 0 ? 25 : 0) +
    (fitnessLevel ? 25 : 0) +
    (neighborhood ? 25 : 0) +
    25
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <OnboardingProgress currentStep={2} totalSteps={3} steps={ONBOARDING_STEPS} />

        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-pulse">⚡</div>
          <h1 className="text-3xl font-bold mb-2">What's Your Vibe?</h1>
          <p className="text-muted-foreground">
            Let's personalize your experience! Pick what excites you 🎯
          </p>
        </div>

        <div className="space-y-6">
          {/* Vibes Selection */}
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎨</span>
                <span>What activities interest you?</span>
              </CardTitle>
              <CardDescription>Select all that apply - you can always add more later!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VIBES.map((vibe) => (
                  <div
                    key={vibe.value}
                    onClick={() => handleVibeToggle(vibe.value)}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                      selectedVibes.includes(vibe.value)
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-gray-200 hover:border-primary/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{vibe.emoji}</div>
                      <h3 className="text-xl font-bold mb-1">{vibe.label}</h3>
                      <p className="text-sm text-muted-foreground">{vibe.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fitness Level */}
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💪</span>
                <span>What's your fitness level?</span>
              </CardTitle>
              <CardDescription>Be honest! We'll match you with the perfect group 😊</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {FITNESS_LEVELS.map((level) => (
                  <div
                    key={level.value}
                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-102 ${
                      fitnessLevel === level.value
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-gray-200 hover:border-primary/30'
                    }`}
                    onClick={() => setFitnessLevel(level.value)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{level.emoji}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{level.label}</div>
                        <div className="text-sm text-muted-foreground">{level.description}</div>
                      </div>
                      {fitnessLevel === level.value && (
                        <div className="text-primary text-2xl">✓</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Neighborhood */}
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📍</span>
                <span>Where are you based?</span>
              </CardTitle>
              <CardDescription>We'll show you activities nearby!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {NEIGHBORHOODS.map((nb) => (
                  <Badge
                    key={nb.name}
                    variant={neighborhood === nb.name ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-3 text-sm justify-center transition-all hover:scale-105 ${
                      neighborhood === nb.name ? 'shadow-md' : ''
                    }`}
                    onClick={() => setNeighborhood(nb.name)}
                  >
                    <span className="mr-2">{nb.emoji}</span>
                    {nb.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Buddy Matching */}
          <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-3xl">💙</span>
                <span>Want a buddy for your first activities?</span>
              </CardTitle>
              <CardDescription className="text-cyan-800">
                We'll pair you with a friendly member who'll show you the ropes and make you feel welcome! 🤝
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 bg-white/80 rounded-lg p-4 border-2 border-cyan-200">
                <Checkbox
                  id="buddy"
                  checked={wantsBuddy}
                  onCheckedChange={(checked) => setWantsBuddy(checked as boolean)}
                  className="w-6 h-6"
                />
                <Label
                  htmlFor="buddy"
                  className="text-base cursor-pointer font-medium flex-1"
                >
                  💙 Yes, I'd love a buddy to show me around!
                </Label>
              </div>
              {wantsBuddy && (
                <div className="mt-4 p-4 bg-cyan-100 rounded-lg">
                  <p className="text-sm text-cyan-900 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    <span>Awesome! We'll match you with experienced members who love welcoming newcomers.</span>
                  </p>
                </div>
              )}
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
          </div>

          {/* Continue Button */}
          <Button 
            onClick={handleContinue} 
            className="w-full text-lg py-6" 
            size="lg"
            disabled={progress < 75}
          >
            Continue to Profile Setup 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}
