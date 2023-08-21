import { ImageContainer } from '@styles/pagesStyle/recover.styles';
import React, { useState, useEffect, useContext } from 'react';
import Title from 'ui/components/Title/Title';
import { Onboarding1, Onboarding2, Onboarding3, Onboarding4, Onboarding5, Onboarding6, Onboarding7, Onboarding8, OnboardingEnd } from 'ui/components/Welcome/Onboarding/OnboardingEnd';
import { Button } from "@material-ui/core";
import Slides from 'ui/components/Welcome/Slides';
import Welcomes from 'ui/components/Welcome/welcome';
import { IUser } from "types/User";
import AuthContext from 'contexts/AuthContext';


function OnboardingOn() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  function NextButton(){
    return(
        
      <Button onClick={nextStep} disabled={step === 8}>
      Próximo
    </Button>
    )
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Onboarding1/>;
      case 2:
        return <Onboarding2/>;
        case 3:
          return <Onboarding8/>;
          case 4:
          return <Onboarding3/>;
          case 5:
          return <Onboarding4/>;
          case 6:
          return <Onboarding5/>;
          case 7:
          return <Onboarding6/>;
          case 8:
          return <Onboarding7/>;
          case 9:
          return <OnboardingEnd/>;
      default:
        return null
    }
  };

  return (
    <div style={{ margin: "auto", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>

      {renderStepContent()}
      {/* <Button onClick={prevStep} disabled={step === 1}>
        Anterior
      </Button> */}
      <Button onClick={nextStep} disabled={step === 9}>
        Próximo
      </Button>
    </div>
  );
};

export default OnboardingOn;
// ao finalizar, inserir no arquivo Onboarding.tsx