import React from "react";
import {
  Grid,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import CustomCheckbox from "../../src/components/forms/custom-elements/CustomCheckbox";
import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";
import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";

import img1 from "../../assets/images/backgrounds/login-bg.svg";
import LogoIcon from "../../src/layouts/logo/LogoIcon";
import useLogin from "../../src/hooks/useLogin";

const Login = () => {
  const { loading, handleLogin } = useLogin();

  return (
    <Grid container sx={{ height: "100vh", justifyContent: "center" }}>
      <Grid item xs={12} sm={8} lg={8} display="flex" alignItems="center">
        <Grid container spacing={0} display="flex" justifyContent="center">
          <Grid item xs={12} lg={9} xl={6}>
            <Box
              sx={{
                p: 4,
              }}
            >
              <Typography fontWeight="700" variant="h3">
                Selamat Datang di SIDAS TKJ SMKN 5
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography
                  color="textSecondary"
                  variant="h6"
                  fontWeight="500"
                  sx={{
                    mr: 1,
                  }}
                >
                  Silahkan login terlebih dahulu
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <form onSubmit={(e) => handleLogin(e)}>
                  <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
                  <CustomTextField
                    id="username"
                    name="username"
                    variant="outlined"
                    fullWidth
                  />
                  <CustomFormLabel name="password" htmlFor="password">
                    Password
                  </CustomFormLabel>
                  <CustomTextField
                    id="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: 4,
                    }}
                  />

                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                    sx={{
                      pt: "10px",
                      pb: "10px",
                    }}
                  >
                    Login
                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Login.layout = "Blank";

export default Login;
