import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Menu, MenuItem, IconButton, Typography, Box, Tooltip } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

import DashboardCard from '../../baseCard/DashboardCard';

const options = ['Action', 'Another Action', 'Something else here'];

const activities = [
  {
    time: '09.50',
    color: 'primary.main',
    text: 'Payment received from John Doe of $385.90',
  },
  {
    time: '09.46',
    color: 'secondary.main',
    text: 'Project Meeting',
  },
  {
    time: '09.47',
    color: 'warning.main',
    text: 'New sale recorded #ML-3467',
  },
  {
    time: '09.48',
    color: 'error.main',
    text: 'Payment was made of $64.95 to Michael Anderson',
  },
  {
    time: '09.49',
    color: 'success.main',
    text: 'New payment receipt created for Alphanso Golvo',
  },
];

const DailyActivities = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <DashboardCard
      title="Daily Activities"
      subtitle="Overview of Years"
      action={
        <Box>
          <Tooltip title="Action">
            <IconButton
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              size="large"
              aria-label="action"
            >
              <FeatherIcon icon="more-horizontal" />
            </IconButton>
          </Tooltip>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      }
    >
      <Timeline
        sx={{
          p: 0,
          mb: 0,
          mt: 0,
        }}
      >
        {activities.map((activity) => (
          <TimelineItem
            key={activity.time}
            sx={{
              minHeight: '57px',
            }}
          >
            <TimelineOppositeContent
              sx={{
                flex: '0',
              }}
            >
              <Typography variant="subtitle2" fontWeight="700">
                {activity.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                sx={{
                  borderColor: activity.color,
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent color="text.secondary" variant="h6">
              {activity.text}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default DailyActivities;
