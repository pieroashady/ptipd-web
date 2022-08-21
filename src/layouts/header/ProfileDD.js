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
import useSWR from "swr";
import axios from "axios";

const apiBaseUrl = "https://absensmkn5-kab.xyz";

const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/user", fetcher);
  if (!data) return <></>;

  const avatar = data.guru?.foto
    ? `${apiBaseUrl}/storage/images/${data.guru.foto}`
    : userimg;

  return (
    <>
      <Box display="flex" alignItems="center">
        <Image
          src={avatar}
          alt={avatar}
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
            {data.role === "admin" ? "Admin" : ""}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            {data.guru?.nama_guru ?? "SIDAS"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDD;
