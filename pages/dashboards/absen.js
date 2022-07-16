import { Grid } from "@mui/material";
import { isEmpty } from "ramda";
import moment from "moment";
import { getAbsenSiswa } from "../../lib/service/absen-siswa";
import StudentAttendance from "../../src/components/dashboard/dashboard1/StudentAttendance";

export async function getServerSideProps({ query }) {
  const today = moment().startOf("day").format("YYYY-MM-DD");

  const search = isEmpty(query)
    ? `tanggal=${today}`
    : `tanggal=${today}&${new URLSearchParams(query).toString()}`;

  const absen = await getAbsenSiswa(`${search}`);

  return {
    props: {
      absen,
    },
  };
}

const Dashboard1 = ({ absen }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <StudentAttendance data={absen} />
      </Grid>
    </Grid>
  );
};

export default Dashboard1;
