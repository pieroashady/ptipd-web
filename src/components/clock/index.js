import { Box, Typography } from "@mui/material";
import LiveClock from "./LiveClock";
import LiveDate from "./LiveDate";

function ClockTicker() {
  return (
    <>
      <Box sx={{ color: "black" }}>
        <LiveDate />
      </Box>
      <Typography color="black">{", "}</Typography>
      <Box sx={{ ml: 1, color: "black" }}>
        <LiveClock />
      </Box>
    </>
  );
}

export default ClockTicker;
