import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import PetDetails from './petDetails';
import Terms from './terms&Conditions';
import UserInfo from './userInfo';

const steps = ['User Details', 'Pet Details', 'Terms&Conditions'];
type SetCheckState = (x: boolean) => boolean;
type SetPetDetState = (x: PetFields) => PetFields;
type SetUserInfoState = (x: UserFields) => UserFields;

export interface PetFields {
  sizeField: string;
  vacField: string;
  petNameField: string;
  breedField: string;
}

export interface UserFields {
  firstNameField: string;
  lastNameField: string;
  emailField: string;
  passwordField: string;
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [petFill, setPetFill] = React.useState(false);
  const [userFill, setUserFill] = React.useState(false);

  const petInit: PetFields = {
    sizeField: '',
    vacField: '',
    petNameField: '',
    breedField: '',
  };

  const userInit: UserFields = {
    firstNameField: '',
    lastNameField: '',
    emailField: '',
    passwordField: '',
  };
  const [userInfo, setUserInfo] = React.useState<UserFields>(userInit);
  const [petDet, setPetDet] = React.useState<PetFields>(petInit);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep]}</Typography>
          <Box>
            {activeStep === 0 && (
              <UserInfo
                user={userInfo}
                changeUserAttribute={setUserInfo as any as SetUserInfoState}
                changeState={setUserFill as any as SetCheckState}
                fillState={userFill}
              />
            )}
            {activeStep === 1 && (
              <PetDetails
                changeState={setPetFill as any as SetCheckState}
                fillState={petFill}
                petDetails={petDet}
                changePetState={setPetDet as any as SetPetDetState}
              />
            )}
            {activeStep === 2 && (
              <>
                <Terms checkChange={setChecked as any as SetCheckState} checkState={checked} />
              </>
            )}
          </Box>

          {activeStep === 1}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1
              ? checked && <Button onClick={handleNext}>Finish</Button>
              : ((activeStep === 0 && userFill) || (activeStep === 1 && petFill)) && (
                  <Button onClick={handleNext}>Next</Button>
                )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
