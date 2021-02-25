import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function Home({ Menu }) {
  const date = new Date();
  const activeStep = date.getDay();
  const classes = useStyles();
  const hall = 'LDH';

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

  const getMealKey = () => {
    const hours = date.getHours() + date.getMinutes() / 60;
    console.log(hours);
    if (hours >= 10 && hours <= 15) return 'Lunch';
    if (hours >= 15 && hours <= 18.5) return 'Snacks';
    if (hours >= 18.5 && hours <= 22.5) return 'Dinner';
    return 'Breakfast';
  };
  const mealKey = getMealKey();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography>
            Today&apos;s
            {' '}
            {mealKey}
            {getMeal(mealKey)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

Home.propTypes = {
  Menu: PropTypes.objectOf(PropTypes.object),
};

Home.defaultProps = {
  Menu: {},
};

export default Home;
