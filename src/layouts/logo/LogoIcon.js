import React from "react";
import { Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";
import LogoLight from "../../../assets/images/logos/logo-white.svg";

const LogoIcon = () => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <Link href="/" underline="none" color="black">
      {customizer.activeMode === "dark" ? (
        <Typography variant="h3" textAlign="center" color="white">
          PTIPD TKJ SMKN 5
        </Typography>
      ) : (
        <Typography variant="h3" textAlign="center">
          PTIPD TKJ SMKN 5
        </Typography>
      )}
    </Link>
  );
};

export default LogoIcon;
