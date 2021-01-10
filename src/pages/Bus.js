import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function Bus() {
  const [location, setLocation] = useState('LAB');
  const [week, setWeek] = useState('Weekday');
  const [open, setOpen] = React.useState(false);
  const toggleWeek = () => {
    if (week === 'Weekday') setWeek('Weekend');
    else {
      setWeek('Weekday');
    }
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
  return (
    <div>
      <Button color="primary" variant="contained" onClick={() => toggleWeek()}>
        {week}
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
      <h1>{location}</h1>
    </div>
  );
}
export default Bus;
