import { Grid } from "@mui/material";
import { isEmpty } from "ramda";
import { getSiswa } from "../../lib/service/siswa";
import WithAuth from "../../lib/session/withAuth";
import StudentList from "../../src/components/dashboard/dashboard2/StudentList";
import SearchDD from "../../src/layouts/header/SearchDD";

export const getServerSideProps = WithAuth(async ({ query }) => {
  const search = isEmpty(query)
    ? ""
    : `${new URLSearchParams(query).toString()}`;

  const siswa = await getSiswa(search);
  return {
    props: {
      siswa,
    },
  };
});

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
