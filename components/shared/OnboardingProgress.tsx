'use client';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: { label: string; emoji: string }[];
}

export function OnboardingProgress({ currentStep, totalSteps, steps }: OnboardingProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                    isCompleted
                      ? 'bg-green-500 scale-90'
                      : isCurrent
                      ? 'bg-primary text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-400 scale-90'
                  }`}
                >
                  {isCompleted ? '✓' : step.emoji}
                </div>
                <span className={`text-xs mt-2 hidden md:block ${isCurrent ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`w-12 md:w-20 h-1 mx-2 rounded transition-all ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </p>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-cyan-500 h-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
