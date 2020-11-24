import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { useTheme } from '@material-ui/core';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function LensIcon({ color }) {
  return (
    <svg width={25} height={25}>
      <path
        fill={color}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      />
    </svg>
  );
}

LensIcon.propTypes = {
  color: PropTypes.string,
};

LensIcon.defaultProps = {
  color: 'red',
};

const StepIcon = ({
  day,
  activeStep,
  activeColor,
  defaultColor,
  textColor,
}) => {
  let color = defaultColor;
  if (day === days[activeStep]) {
    color = activeColor;
  }
  return (
    <div style={{ position: 'relative' }}>
      <LensIcon color={color} />
      <div
        style={{
          color: textColor,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          textAlign: 'center',
          lineHeight: '24px',
        }}
      >
        {day[0]}
      </div>
    </div>
  );
};

StepIcon.propTypes = {
  day: PropTypes.string,
  activeStep: PropTypes.number,
  activeColor: PropTypes.string,
  defaultColor: PropTypes.string,
  textColor: PropTypes.string,
};
StepIcon.defaultProps = {
  day: 'Sunday',
  activeStep: 0,
  activeColor: 'red',
  defaultColor: 'red',
  textColor: 'black',
};

function Mess() {
  const date = new Date();
  const [activeStep, setActiveStep] = useState(date.getDay());
  const theme = useTheme();

  return (
    <Stepper alternativeLabel nonLinear activeStep={activeStep}>
      {days.map((day, index) => (
        <Step key={day}>
          <StepButton
            icon={(
              <StepIcon
                day={day}
                activeStep={activeStep}
                activeColor={theme.palette.primary.main}
                defaultColor={theme.palette.primary.contrastText}
                textColor="black"
              />
            )}
            onClick={() => setActiveStep(index)}
          />
        </Step>
      ))}
    </Stepper>
  );
}

export default Mess;
