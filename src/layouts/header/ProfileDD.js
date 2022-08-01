import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import NextLink from "next/link";
import userimg from "../../../assets/images/users/user2.jpg";
import {
  Box,
  Menu,
  Typography,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  return (
    <>
      <Box display="flex" alignItems="center">
        <Image
          src={userimg}
          alt={userimg}
          width="30"
          height="30"
          className="roundedCircle"
        />
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
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Admin
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            SIDAS
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDD;
