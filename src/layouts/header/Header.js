import React from 'react';
import FeatherIcon from 'feather-icons-react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
// Dropdown Component
import SearchDD from './SearchDD';
import ProfileDD from './ProfileDD';
import ClockTicker from '../../components/clock';
import LogoutButton from '../../components/logout/logout-button';

const Header = ({
  sx,
  customClass,
  toggleSidebar,
  toggleMobileSidebar,
  position,
  showSidebar,
}) => {
  return (
    <AppBar sx={sx} position={position} elevation={0} className={customClass}>
      <Toolbar>
        {showSidebar && (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              size="large"
              sx={{
                display: {
                  lg: 'flex',
                  xs: 'none',
                },
              }}
            >
              <FeatherIcon icon="menu" />
            </IconButton>

            <IconButton
              size="large"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileSidebar}
              sx={{
                display: {
                  lg: 'none',
                  xs: 'flex',
                },
              }}
            >
              <FeatherIcon icon="menu" width="20" height="20" />
            </IconButton>
          </>
        )}
        {showSidebar && (
          <Typography color={'black'} fontSize={27}>
            SISTEM INFORMASI DAN ABSENSI SISWA
          </Typography>
        )}
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        {/* <SearchDD /> */}
        {/* ------------ End Menu icon ------------- */}

        <Box flexGrow={1} />
        {/* ------------------------------------------- */}
        {/* Ecommerce Dropdown */}
        {/* ------------------------------------------- */}
        {/* <CartDropdown /> */}
        {/* ------------------------------------------- */}
        {/* End Ecommerce Dropdown */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Messages Dropdown */}
        {/* ------------------------------------------- */}
        {/* <MessageDropdown /> */}
        {/* ------------------------------------------- */}
        {/* End Messages Dropdown */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Notifications Dropdown */}
        {/* ------------------------------------------- */}
        {/* <NotificationDropdown /> */}
        {/* ------------------------------------------- */}
        {/* End Notifications Dropdown */}
        {/* ------------------------------------------- */}

        <Box
          sx={{
            width: '1px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            height: '25px',
            ml: 1,
            mr: 1,
          }}
        />
        {!showSidebar && <ClockTicker />}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        {showSidebar && <ProfileDD />}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: '1px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            height: '25px',
            ml: 1,
            mr: 1,
          }}
        />
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
