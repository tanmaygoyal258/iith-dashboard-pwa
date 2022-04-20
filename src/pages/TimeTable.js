import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { segmentEndDates } from '../makeEventList';

import './TimeTable.css';

function TimeTable({ eventList, handleNewCustomEvent }) {
  const [open, setOpen] = useState(false);
  const [def, setDefault] = useState(null);
  const [showAimsError, setShowAimsError] = useState(
    localStorage.getItem('aimskey') === null,
  );

  const muiTheme = useTheme();

  let title = '';
  let eventDate = null;
  let startTime = null;
  let endTime = null;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  useEffect(() => {
    document
      .querySelector('#calendar-div')
      .style.setProperty('--primary-color', muiTheme.palette.primary.main);
    document
      .querySelector('#calendar-div')
      .style.setProperty('--text-color', muiTheme.palette.primary.contrastText);
    document
      .querySelector('#calendar-div')
      .style.setProperty('--border-color', '#808080');
  });

  useEffect(() => {
    const today = new Date();
    const date = `${today.getFullYear().toString()}-${
      today.getMonth() + 1 < 10
        ? `0${(today.getMonth() + 1).toString()}`
        : (today.getMonth() + 1).toString()
    }-${today
      .getDate()
      .toString()}T${today
      .getHours()
      .toString()}:${today.getMinutes().toString()}`;
    setDefault(date);
  }, []);

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    title = event.target.value;
  };

  const handleDateChange = (event) => {
    eventDate = event.target.value;
  };

  const handleStartChange = (event) => {
    startTime = event.target.value;
  };

  const handleEndChange = (event) => {
    endTime = event.target.value;
  };
  const genNewEvent = () => {
    if (!eventDate || !endTime || !startTime) {
      alert('Start and End Times must be specified to create a new event');
      handleClose();
      return;
    }
    // TODO: Ensure that end date is after start date, might mess up the Calendar library otherwise
    const startDate = new Date(`${eventDate} ${startTime}:00`);
    const endDate = new Date(`${eventDate} ${endTime}:00`);
    const weekly = document.getElementById('weekly_recur');
    const daily = document.getElementById('daily_recur');
    const limitDate = new Date(`${segmentEndDates[5]}`);
    if (startDate < endDate) {
      const newCustomEvents = [];
      if (weekly.checked) {
        for (let i = 0; i < limitDate.getDate(); i += 1) {
          newCustomEvents.push({
            start: new Date(startDate),
            end: new Date(endDate),
            title,
          });
          startDate.setDate(startDate.getDate() + 7);
          endDate.setDate(endDate.getDate() + 7);
        }
      } else if (daily.checked) {
        for (let i = 0; i < limitDate.getDate(); i += 1) {
          newCustomEvents.push({
            start: new Date(startDate),
            end: new Date(endDate),
            title,
          });
          startDate.setDate(startDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);
        }
      } else {
        newCustomEvents.push({
          start: new Date(startDate),
          end: new Date(endDate),
          title,
        });
      }
      handleNewCustomEvent(newCustomEvents);
      handleClose();
    } else {
      const newCustomEvents = [];
      if (weekly.checked) {
        for (let i = 0; i < limitDate.getDate(); i += 1) {
          newCustomEvents.push({
            start: new Date(endDate),
            end: new Date(startDate),
            title,
          });
          startDate.setDate(startDate.getDate() + 7);
          endDate.setDate(endDate.getDate() + 7);
        }
      } else if (daily.checked) {
        for (let i = 0; i < limitDate.getDate(); i += 1) {
          newCustomEvents.push({
            start: new Date(endDate),
            end: new Date(startDate),
            title,
          });
          startDate.setDate(startDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);
        }
      } else {
        newCustomEvents.push({ start: endDate, end: startDate, title });
      }
    }
  };
  return (
    <div id="calendar-div">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,today,next',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        slotLabelFormat={{
          hour: 'numeric',
          hour12: false,
        }}
        expandRows={false}
        scrollTime="09:00:00"
        eventOverlap
        slotEventOverlap={false}
        nowIndicator
        allDaySlot={false}
        events={eventList}
        height="70vh"
      />

      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          style={{ margin: '10px' }}
        >
          Add event
        </Button>
      </Box>
      <SnackBar
        open={showAimsError}
        autoHideDuration={3000}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          setShowAimsError(false);
        }}
        style={{
          marginBottom: '10%',
        }}
      >
        <MuiAlert elevation={6} variant="filled" severity="warning">
          AIMS Timetable not synced
        </MuiAlert>
      </SnackBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the details of the event below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="event title"
            fullWidth
            onChange={handleTitleChange}
          />
          <TextField
            id="event_date"
            label="Event date"
            type="date"
            defaultValue={def}
            className={classes.textField}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="start_time"
            label="Start Time"
            type="time"
            defaultValue={def}
            className={classes.textField}
            onChange={handleStartChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="end_time"
            label="End Time"
            type="time"
            defaultValue={def}
            className={classes.textField}
            onChange={handleEndChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="daily_recur">Daily:
        <input type="checkbox" id='daily_recur'/></label> */}
        <FormControlLabel
          control={
            <Checkbox name="checkedB" color="primary" id="daily_recur" />
          }
          label="-Daily"
        />

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="weekly_recur">Weekly:
        <input type="checkbox" id='weekly_recur'/></label> */}
        <FormControlLabel
          control={
            <Checkbox name="checkedB" color="primary" id="weekly_recur" />
          }
          label="-Weekly"
        />

        <DialogActions>
          <Button
            onClick={genNewEvent}
            color="primary"
            style={{ margin: '16px' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

TimeTable.propTypes = {
  // eslint-disable-next-line
  eventList: PropTypes.arrayOf(PropTypes.object),
  handleNewCustomEvent: PropTypes.func,
};

TimeTable.defaultProps = {
  eventList: [],
  // eslint-disable-next-line
  handleNewCustomEvent: () => {
    alert('Error, please try again later');
  },
};

export default TimeTable;
