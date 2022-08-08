import { Grid } from "@mui/material";
import { getJurusan } from "../../lib/service/jurusan";
import JurusanList from "../../src/components/dashboard/dashboard2/JurusanList";

export async function getServerSideProps({ query }) {
  const jurusanData = await getJurusan();
  return {
    props: {
      jurusanData,
    },
  };
}

const TahunAjaran = ({ jurusanData }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <JurusanList data={jurusanData} />
      </Grid>
    </Grid>
  );
};

export default TahunAjaran;
