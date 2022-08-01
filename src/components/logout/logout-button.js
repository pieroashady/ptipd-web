import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <Button
      color="inherit"
      onClick={async () => {
        await axios.post("/api/logout");
        router.replace("/authentication/login");
      }}
    >
      <Box display="flex" alignItems="center">
        <FeatherIcon icon="log-out" width="20" height="20" />
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            Logout
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};

export default LogoutButton;
