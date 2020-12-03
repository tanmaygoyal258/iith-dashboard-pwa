import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { useTheme } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

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

function Mess({ Menu }) {
  const date = new Date();
  const [activeStep, setActiveStep] = useState(date.getDay());
  const theme = useTheme();
  const [hall, setHall] = useState('LDH');

  const getMeal = (meal) => {
    const listItems = Menu[hall][days[activeStep]][meal];
    const additionalKey = `${hall} Additional`;
    const extraItems = Menu[additionalKey][days[activeStep]][meal];
    return (
      <div>
        <ul>
          {listItems.map((item) => (
            <li>
              <Typography>{item}</Typography>
            </li>
          ))}
        </ul>
        <div>
          <Typography>Extras</Typography>
        </div>
        <ul>
          {extraItems.map((item) => (
            <li>
              <Typography>{item}</Typography>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
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
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button onClick={() => setHall('LDH')}>LDH</Button>
        <Button onClick={() => setHall('UDH')}>UDH</Button>
      </ButtonGroup>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Breakfast</Typography>
        </AccordionSummary>
        <AccordionDetails>{getMeal('Breakfast')}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Lunch</Typography>
        </AccordionSummary>
        <AccordionDetails>{getMeal('Lunch')}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Snacks</Typography>
        </AccordionSummary>
        <AccordionDetails>{getMeal('Snacks')}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Dinner</Typography>
        </AccordionSummary>
        <AccordionDetails>{getMeal('Dinner')}</AccordionDetails>
      </Accordion>
    </div>
  );
}

Mess.propTypes = {
  Menu: PropTypes.objectOf(PropTypes.object),
};

Mess.defaultProps = {
  Menu: {},
};

export default Mess;