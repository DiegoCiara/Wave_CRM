import React, { useState, useEffect } from 'react';
import Welcomes from '../welcome';
import OnboardingOn from './Onboarding';

const OnboardingChange = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasLoggedIn = localStorage.getItem('hasLoggedIn');
    if (!hasLoggedIn) {
      // Se o usuário ainda não fez o login, exibe o onboarding
      setShowOnboarding(true);
      localStorage.setItem('hasLoggedIn', 'true');

    }
  }, []);

  if (!showOnboarding) {
    return (
        <Welcomes/>
    )
  }

  return (
    <div>
        <OnboardingOn/>
    </div>
  );
};

export default OnboardingChange;
