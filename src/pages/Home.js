import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

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

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: 14,
  },
}));

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function Home({ Menu, schedule, events }) {
  const [times, setTimes] = useState(null);
  const [start, setStart] = useState(0);
  const date = new Date();
  const activeStep = date.getDay();
  const classes = useStyles();
  const classes2 = useStyles2();
  const hall = 'LDH';
  useEffect(() => {
    const hours = date.getHours() + date.getMinutes() / 60;
    const buses = [];
    let check = 0;
    if (start === 0) {
      let timeSet = schedule.ToIITH.LINGAMPALLY.map((x) => x);
      if (date.getDay() === 0 || date.getDay() === 6) {
        timeSet = schedule.ToIITH.LINGAMPALLYW.map((x) => x);
      }
      for (let i = 0; i < timeSet.length; i += 1) {
        const index = timeSet[i].lastIndexOf(':');
        const hoursText = parseFloat(timeSet[i].substring(0, index))
          + parseFloat(timeSet[i].substring(index + 1, timeSet[i].length)) / 60;
        if (hoursText > hours) {
          check = 1;
          buses.push(timeSet[i]);
          break;
        }
      }
      if (check === 0) buses.push(timeSet[0]);
      check = 0;
      timeSet = schedule.ToIITH.LAB.map((x) => x);
      for (let i = 0; i < timeSet.length; i += 1) {
        const index = timeSet[i].lastIndexOf(':');
        const hoursText = parseFloat(timeSet[i].substring(0, index))
          + parseFloat(timeSet[i].substring(index + 1, timeSet[i].length)) / 60;
        if (hoursText > hours) {
          check = 1;
          buses.push(timeSet[i]);
          break;
        }
      }
      if (check === 0) buses.push(timeSet[0]);
      check = 0;
      timeSet = schedule.ToIITH.SANGAREDDY.map((x) => x);
      for (let i = 0; i < timeSet.length; i += 1) {
        const index = timeSet[i].lastIndexOf(':');
        const hoursText = parseFloat(timeSet[i].substring(0, index))
          + parseFloat(timeSet[i].substring(index + 1, timeSet[i].length)) / 60;
        if (hoursText > hours) {
          check = 1;
          buses.push(timeSet[i]);
          break;
        }
      }
      if (check === 0) buses.push(timeSet[0]);
      check = 0;
    } else {
      let timeSet = schedule.FromIITH.LINGAMPALLY.map((x) => x);
      if (date.getDay() === 0 || date.getDay() === 6) {
        timeSet = schedule.FromIITH.LINGAMPALLYW.map((x) => x);
      }
      for (let i = 0; i < timeSet.length; i += 1) {
        const index = timeSet[i].lastIndexOf(':');
        const hoursText = parseFloat(timeSet[i].substring(0, index))
          + parseFloat(timeSet[i].substring(index + 1, timeSet[i].length)) / 60;
        if (hoursText > hours) {
          check = 1;
          buses.push(timeSet[i]);
          break;
        }
      }
      if (check === 0) buses.push(timeSet[0]);
      check = 0;
      timeSet = schedule.FromIITH.LAB.map((x) => x);
      for (let i = 0; i < timeSet.length; i += 1) {
        const index = timeSet[i].lastIndexOf(':');
        const hoursText = parseFloat(timeSet[i].substring(0, index))
          + parseFloat(timeSet[i].substring(index + 1, timeSet[i].length)) / 60;
        if (hoursText > hours) {
          check = 1;
          buses.push(timeSet[i]);
          break;
        }
      }
      if (check === 0) buses.push(timeSet[0]);
      check = 0;
      timeSet = schedule.FromIITH.SANGAREDDY.map((x) => x);
      for (let i = 0; i < timeSet.length; i += 1) {
        const index = timeSet[i].lastIndexOf(':');
        const hoursText = parseFloat(timeSet[i].substring(0, index))
          + parseFloat(timeSet[i].substring(index + 1, timeSet[i].length)) / 60;
        if (hoursText > hours) {
          check = 1;
          buses.push(timeSet[i]);
          break;
        }
      }
      if (check === 0) buses.push(timeSet[0]);
      check = 0;
    }
    setTimes(buses);
  }, [schedule, start]);

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
          <h3>Extras</h3>
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

  const getEvents = () => {
    const today = new Date();
    const currentEvents = [];
    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];
      const eventDate = new Date(event.start);
      if (
        eventDate.getDate() === today.getDate()
        && eventDate.getMonth() === today.getMonth()
        && eventDate.getFullYear() === today.getFullYear()
      ) {
        const newEvent = {};
        newEvent.title = event.title;
        const endDate = new Date(event.end);
        if (
          eventDate.getDate() === endDate.getDate()
          && eventDate.getMonth() === endDate.getMonth()
          && eventDate.getFullYear() === endDate.getFullYear()
        ) {
          newEvent.timestamp = `${eventDate.getHours().toString()}:${
            eventDate.getMinutes().toString() === '0'
              ? '00'
              : eventDate.getMinutes().toString()
          } - ${endDate.getHours().toString()}:${
            endDate.getMinutes().toString() === '0'
              ? '00'
              : endDate.getMinutes().toString()
          }`;
        } else {
          newEvent.timestamp = '';
        }
        currentEvents.push(newEvent);
      }
    }
    return (
      <div>
        <ul>
          {currentEvents.map((item) => (
            <li>
              <Typography>{`${item.title} ${item.timestamp}`}</Typography>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const toggleStart = () => {
    const newStart = 1 - start;
    setStart(newStart);
  };
  const getMealKey = () => {
    const hours = date.getHours() + date.getMinutes() / 60;
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
          <h3>Today&apos;s Agenda</h3>
          <Typography>{getEvents()}</Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <h3>
            Today&apos;s
            {` ${mealKey}`}
          </h3>
          <Typography>{getMeal(mealKey)}</Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography>
            <Grid
              container
              spacing={0}
              style={{ padding: '10px' }}
              className={classes2.root}
              alignItems="center"
            >
              <Grid item xs={6} alignItems="center">
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  bgcolor="background.paper"
                  alignItems="center"
                >
                  <h3>Bus schedule</h3>
                </Box>
              </Grid>
              <Grid item xs={6} justifyContent="flex-end" alignitems="center">
                <Box
                  display="flex"
                  bgcolor="background.paper"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => toggleStart()}
                  >
                    {start === 0 ? 'To IITH' : 'From IITH'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={0} className={classes2.root}>
              <Grid item xs={4}>
                <Paper className={classes2.paper}>
                  <h4>Lingampally</h4>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes2.paper}>
                  <h4>MainGate</h4>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes2.paper}>
                  <h4>Sangareddy</h4>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes2.paper}>
                  {times != null ? times[0] : 'loading'}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes2.paper}>
                  {times != null ? times[1] : 'loading'}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes2.paper}>
                  {times != null ? times[2] : 'loading'}
                </Paper>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

Home.propTypes = {
  Menu: PropTypes.objectOf(PropTypes.object),
  schedule: PropTypes.objectOf(PropTypes.object),
  events: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
  Menu: {},
  schedule: {},
  events: [],
};

export default Home;
