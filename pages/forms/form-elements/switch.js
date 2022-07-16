import React from 'react';
import { Grid, Box, Switch, FormGroup, FormControlLabel } from '@mui/material';

import BaseCard from '../../../src/components/baseCard/BaseCard';

import CustomSwitch from '../../../src/components/forms/custom-elements/CustomSwitch';


const ExSwitch = () => (
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
        <BaseCard title="Custom Switch">
          <Box sx={{ textAlign: 'center' }}>
            <CustomSwitch checked />
            <CustomSwitch />
            <CustomSwitch disabled defaultChecked />
            <CustomSwitch disabled />
          </Box>
        </BaseCard>
      </Grid>

      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
        <BaseCard title="Default Switch">
          <Box sx={{ textAlign: 'center' }}>
            <Switch defaultChecked />
            <Switch />
            <Switch disabled defaultChecked />
            <Switch disabled />
          </Box>
        </BaseCard>
      </Grid>

      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
        <BaseCard title="Default Switch with Label">
          <Box sx={{ textAlign: 'center' }}>
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked />} label="Label" />
              <FormControlLabel disabled control={<Switch />} label="Disabled" />
            </FormGroup>
          </Box>
        </BaseCard>
      </Grid>

      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
        <BaseCard title="Default Sizes">
          <Box sx={{ textAlign: 'center' }}>
            <Switch defaultChecked size="small" />
            <Switch defaultChecked />
          </Box>
        </BaseCard>
      </Grid>

      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
        <BaseCard title="Default Colors">
          <Box sx={{ textAlign: 'center' }}>
            <Switch defaultChecked />
            <Switch defaultChecked color="secondary" />
            <Switch defaultChecked color="error" />
            <Switch defaultChecked color="warning" />
            <Switch defaultChecked color="success" />
            <Switch defaultChecked color="default" />
          </Box>
        </BaseCard>
      </Grid>

      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
        <BaseCard title="Default Label Placement">
          <Box sx={{ textAlign: 'center' }}>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="top"
                control={<Switch color="primary" />}
                label="Top"
                labelPlacement="top"
              />
              <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label="Start"
                labelPlacement="start"
              />
              <FormControlLabel
                value="bottom"
                control={<Switch color="primary" />}
                label="Bottom"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="end"
                control={<Switch color="primary" />}
                label="End"
                labelPlacement="end"
              />
            </FormGroup>
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
);
export default ExSwitch;
