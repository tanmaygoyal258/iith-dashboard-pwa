import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RestaurantIcon from '@material-ui/icons/Restaurant';
// import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Link } from 'react-router-dom';

function BottomNav() {
  const [currentTab, setCurrentTab] = useState('');
  const [isMobile, setIsMobile] = useState(true);
  const handleTabChange = (_, newTab) => {
    setCurrentTab(newTab);
  };
  useEffect(() => {
    const currentPage = window.location.pathname;
    // Delete the slash prefix
    setCurrentTab(currentPage.substr(1));
  }, [setCurrentTab]);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 500);
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth <= 500);
    });
  }, []);
  return (
    <BottomNavigation value={currentTab} onChange={handleTabChange} showLabels>
      <BottomNavigationAction
        component={Link}
        to=""
        label={isMobile ? '' : 'Home'}
        value=""
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/mess"
        label={isMobile ? '' : 'Mess'}
        value="mess"
        icon={<RestaurantIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/timetable"
        label={isMobile ? '' : 'Timetable'}
        value="timetable"
        icon={<CalendarTodayIcon />}
      />
      {/* <BottomNavigationAction
        component={Link}
        to="/cab"
        label=""
        value="cab"
        icon={<LocalTaxiIcon />}
      /> */}
      <BottomNavigationAction
        component={Link}
        to="/bus"
        label={isMobile ? '' : 'Bus'}
        value="bus"
        icon={<DirectionsBusIcon />}
      />
    </BottomNavigation>
  );
}
export default BottomNav;
