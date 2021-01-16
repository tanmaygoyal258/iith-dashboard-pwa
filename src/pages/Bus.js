import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import {
  Divider, List, ListItem, ListItemText,
} from '@material-ui/core';

import './Bus.css';

function Bus({ schedule }) {
  const [location, setLocation] = useState('LAB');
  const [isWeekend, setIsWeekend] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleWeek = () => {
    setIsWeekend(!isWeekend);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const makeTimeList = (direction) => {
    if (direction === 'to') {
      let times;
      if (location === 'LINGAMPALLY') {
        if (isWeekend) {
          times = schedule.ToIITH.LINGAMPALLYW;
        } else {
          times = schedule.ToIITH.LINGAMPALLY;
        }
      } else {
        times = schedule.ToIITH[location];
      }

      return times.map((time) => (
        <>
          <ListItem key={time}>
            <ListItemText>{time}</ListItemText>
          </ListItem>
          <Divider />
        </>
      ));
    }
    if (direction === 'from') {
      let times;
      if (location === 'LINGAMPALLY') {
        if (isWeekend) {
          times = schedule.FromIITH.LINGAMPALLYW;
        } else {
          times = schedule.FromIITH.LINGAMPALLY;
        }
      } else {
        times = schedule.FromIITH[location];
      }

      return times.map((time) => (
        <>
          <ListItem key={time}>
            <ListItemText>{time}</ListItemText>
          </ListItem>
          <Divider />
        </>
      ));
    }

    return (
      <ListItem>
        <ListItemText>Error</ListItemText>
      </ListItem>
    );
  };

  if (schedule === null || schedule === undefined) {
    return <h1>Error</h1>;
  }

  if (Object.keys(schedule).length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Button
          color="primary"
          variant="contained"
          onClick={() => toggleWeek()}
        >
          {isWeekend ? 'Weekday' : 'Weekend'}
        </Button>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={location}
          onChange={handleChange}
        >
          <MenuItem value="LINGAMPALLY">Lingampally</MenuItem>
          <MenuItem value="SANGAREDDY">Sangareddy</MenuItem>
          <MenuItem value="ODF">ODF</MenuItem>
          <MenuItem value="LAB">Maingate</MenuItem>
        </Select>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        padding="50px"
      >
        <Box>
          <h3>
            IITH to
            {location[0] + location.substr(1).toLowerCase()}
          </h3>
          <List className="times-list">{makeTimeList('to')}</List>
        </Box>
        <Box>
          <h3>
            {location[0] + location.substr(1).toLowerCase()}
            {' '}
            to IITH
          </h3>
          <List className="times-list">{makeTimeList('from')}</List>
        </Box>
      </Box>
    </div>
  );
}
export default Bus;

Bus.propTypes = {
  schedule: PropTypes.objectOf(PropTypes.object),
};

Bus.defaultProps = {
  schedule: {},
};
