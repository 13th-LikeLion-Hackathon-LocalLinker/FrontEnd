import React from 'react';
import type { OnboardingPageProps } from './OnboardingPage.types';

function OnboardingPage({ onNext }: OnboardingPageProps) {
  return (
    <div>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default OnboardingPage;
