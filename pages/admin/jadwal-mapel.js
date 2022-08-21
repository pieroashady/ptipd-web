import { Grid } from "@mui/material";
import { isEmpty } from "ramda";
import { getJadwalMapel } from "../../lib/service/jadwal-mapel";
import { getJurusan } from "../../lib/service/jurusan";
import WithAuth from "../../lib/session/withAuth";
import JadwalMapelList from "../../src/components/dashboard/dashboard2/JadwalMapelList";
import JurusanList from "../../src/components/dashboard/dashboard2/JurusanList";

export const getServerSideProps = WithAuth(async ({ query }) => {
  const search = isEmpty(query)
    ? ""
    : `${new URLSearchParams(query).toString()}`;

  const jadwalMapelData = await getJadwalMapel();
  return {
    props: {
      jadwalMapelData,
    },
  };
});

const JadwalMapel = ({ jadwalMapelData }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <JadwalMapelList data={jadwalMapelData} />
      </Grid>
    </Grid>
  );
};

export default JadwalMapel;
