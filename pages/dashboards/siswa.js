import { Grid } from "@mui/material";
import { getSiswa } from "../../lib/service/siswa";
import StudentList from "../../src/components/dashboard/dashboard2/StudentList";

export async function getServerSideProps({ query }) {
  const siswa = await getSiswa();
  return {
    props: {
      siswa,
    },
  };
}

const Student = ({ siswa }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <StudentList data={siswa} />
      </Grid>
    </Grid>
  );
};

export default Student;
