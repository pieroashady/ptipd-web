import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, CardHeader, CardContent, Box } from '@mui/material';

const DashboardCard = ({
  custompadding,
  customheaderpadding,
  customdisplay,
  custommargin,
  title,
  subtitle,
  action,
  children,
  textAlign,
}) => (
  <Card>
    <CardHeader
      sx={{
        p: customheaderpadding,
        display: {
          xs: customdisplay,
          // lg: 'flex',
          // sm: 'flex',
        },
      }}
      title={
        <Typography
          variant="h3"
          textAlign={textAlign}
          sx={{
            mb: {
              xs: custommargin,
            },
          }}
        >
          {title}
        </Typography>
      }
      subtitle={subtitle}
      action={<Box sx={{ mt: 4 }}>{action}</Box> || ''}
    />
    {/* content area */}
    <CardContent
      sx={{
        p: custompadding,
      }}
    >
      {children}
    </CardContent>
  </Card>
);

DashboardCard.propTypes = {
  custompadding: PropTypes.string,
  customheaderpadding: PropTypes.string,
  customdisplay: PropTypes.string,
  custommargin: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  action: PropTypes.any,
  children: PropTypes.node,
};

export default DashboardCard;
