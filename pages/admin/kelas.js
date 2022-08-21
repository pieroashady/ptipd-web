import { Grid } from "@mui/material";
import { getKelas } from "../../lib/service/kelas";
import WithAuth from "../../lib/session/withAuth";
import ClassList from "../../src/components/dashboard/dashboard2/ClassList";

export const getServerSideProps = WithAuth(async ({ query }) => {
  const classData = await getKelas();
  return {
    props: {
      classData,
    },
  };
});

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
