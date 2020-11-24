import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

function Mess() {
  const [activeStep, setActiveStep] = useState(0);
  function getDays() {
    return ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  }
  const days = getDays();
  return (
    <div>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {days.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={() => setActiveStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default Mess;
