import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { isEmpty } from "ramda";
import Image from "next/image";

import logo from "../../assets/images/logos/logo.png";

const Home = () => {
  return (
    <Grid container spacing={0} sx={{ mt: 5 }}>
      <Grid item textAlign={"center"} lg={12} sx={{ mb: 4 }}>
        <Image alig src={logo} alt={logo} height={400} width={300} />
      </Grid>
      <Grid item lg={12} sx={{ mb: 4 }}>
        <Typography variant="h1" fontSize={60} textAlign={"center"}>
          SIDAS TKJ SMK Negeri 5 Kab. Tangerang
        </Typography>
      </Grid>
      <Grid item lg={12}>
        <Typography fontSize={30} textAlign={"center"}>
          Jl. Ir. Sutami Km 1.2, Mauk, Mauk Barat, Mauk, Tangerang, Banten 15330
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
