import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

function LiveClock() {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <Typography>
      {dateState.toLocaleString("en-US", {
        second: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      })}
    </Typography>
  );
}

export default LiveClock;
