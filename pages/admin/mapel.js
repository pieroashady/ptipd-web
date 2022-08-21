import { Grid } from "@mui/material";
import { getJurusan } from "../../lib/service/jurusan";
import { getMapel } from "../../lib/service/mapel";
import WithAuth from "../../lib/session/withAuth";
import JurusanList from "../../src/components/dashboard/dashboard2/JurusanList";
import MapelList from "../../src/components/dashboard/dashboard2/MapelList";

export const getServerSideProps = WithAuth(async ({ query }) => {
  const mapelData = await getMapel();
  return {
    props: {
      mapelData,
    },
  };
});

const Mapel = ({ mapelData }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <MapelList data={mapelData} />
      </Grid>
    </Grid>
  );
};

export default Mapel;
