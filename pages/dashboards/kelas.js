import { Grid } from "@mui/material";
import { getKelas } from "../../lib/service/kelas";
import ClassList from "../../src/components/dashboard/dashboard2/ClassList";

export async function getServerSideProps({ query }) {
  const classData = await getKelas();
  return {
    props: {
      classData,
    },
  };
}

const Kelas = ({ classData }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ClassList data={classData} />
      </Grid>
    </Grid>
  );
};

export default Kelas;
