import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Link } from 'react-router-dom';

function BottomNav() {
  const [currentTab, setCurrentTab] = useState('mess');
  const handleTabChange = (_, newTab) => {
    setCurrentTab(newTab);
  };
  return (
    <BottomNavigation value={currentTab} onChange={handleTabChange} showLabels>
      <BottomNavigationAction
        component={Link}
        to="/mess"
        label="Mess Menu"
        value="mess"
        icon={<RestaurantIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/timetable"
        label="Timetable"
        value="timetable"
        icon={<CalendarTodayIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/cab"
        label="Cab Sharing"
        value="cab-sharing"
        icon={<LocalTaxiIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/bus"
        label="Bus Schedule"
        value="bus-schedule"
        icon={<DirectionsBusIcon />}
      />
    </BottomNavigation>
  );
}
export default BottomNav;
