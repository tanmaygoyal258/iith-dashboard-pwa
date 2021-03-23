import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Link } from 'react-router-dom';

function BottomNav() {
  const [currentTab, setCurrentTab] = useState('home');
  const handleTabChange = (_, newTab) => {
    setCurrentTab(newTab);
  };

  useEffect(() => {
    const currentPage = window.location.pathname;
    // Delete the slash prefix
    setCurrentTab(currentPage.substr(1));
  }, [setCurrentTab]);

  return (
    <BottomNavigation value={currentTab} onChange={handleTabChange} showLabels>
      <BottomNavigationAction
        component={Link}
        to=""
        label="Home"
        value=""
        icon={<HomeIcon />}
      />
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
        value="cab"
        icon={<LocalTaxiIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/bus"
        label="Bus Schedule"
        value="bus"
        icon={<DirectionsBusIcon />}
      />
    </BottomNavigation>
  );
}
export default BottomNav;
