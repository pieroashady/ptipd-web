import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

function LiveDate() {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <Typography>
      {dateState.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </Typography>
  );
}

export default LiveDate;
