import React from "react";
import NextLink from "next/link";

import { Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";
import LogoLight from "../../../assets/images/logos/logo-white.svg";

const LogoIcon = () => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <NextLink href="/home">
      <Link href="" underline="none" color="black">
        {customizer.activeMode === "dark" ? (
          <Typography variant="h3" textAlign="center" color="white">
            SIDAS TKJ SMKN 5
          </Typography>
        ) : (
          <Typography variant="h3" textAlign="center">
            SIDAS TKJ SMKN 5
          </Typography>
        )}
      </Link>
    </NextLink>
  );
};

export default LogoIcon;
