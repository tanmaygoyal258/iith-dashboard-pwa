import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './TimeTable.css';

function TimeTable({ eventList, handleNewCustomEvent }) {
  const [open, setOpen] = React.useState(false);
  const [def, setDefault] = React.useState(null);

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

  // const useWindowSize = () => {
  //   const [size, setSize] = useState([0, 0]);
  //   useLayoutEffect(() => {
  //     function updateSize() {
  //       setSize([window.innerWidth, window.innerHeight]);
  //     }
  //     window.addEventListener('resize', updateSize);
  //     updateSize();
  //     return () => window.removeEventListener('resize', updateSize);
  //   }, []);
  //   return size;
  // };

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
    if (startDate < endDate) {
      handleNewCustomEvent(title, startDate, endDate);
    } else {
      handleNewCustomEvent(title, endDate, startDate);
    }
    handleClose();
  };

  // Custom accessors needed since the eventList is stored in localStorage, where the
  // Date is stringified
  // const height = useWindowSize()[0];
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,today,next',
          right: 'dayGridMonth,timeGridWeek',
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
        events={eventList}
        height={500}
      />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add event
      </Button>
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
        <DialogActions>
          <Button onClick={genNewEvent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

TimeTable.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.object),
  handleNewCustomEvent: PropTypes.func,
};

TimeTable.defaultProps = {
  eventList: [],
  handleNewCustomEvent: () => {
    alert('Error, please try again later');
  },
};

export default TimeTable;
