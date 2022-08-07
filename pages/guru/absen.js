import { Grid } from '@mui/material';
import { isEmpty } from 'ramda';
import moment from 'moment';
import { getAbsenSiswa } from '../../lib/service/absen-siswa';
import { getKelas } from '../../lib/service/kelas';
import StudentAttendance from '../../src/components/dashboard/dashboard1/StudentAttendance';
import GuruStudentAttendance from '../../src/components/dashboard/dashboard1/GuruStudentAttendance';
import WithAuth from '../../lib/session/withAuth';
import { getJadwalMapel } from '../../lib/service/jadwal-mapel';

export const getServerSideProps = WithAuth(async ({ req, query }) => {
  const today = moment().startOf('day').format('YYYY-MM-DD');

  const search = isEmpty(query)
    ? `tanggal=${today}`
    : `tanggal=${today}&${new URLSearchParams(query).toString()}`;

  const absen = await getAbsenSiswa(`${search}`);

  console.log(req.session);

  const kelasData = await getJadwalMapel(`guru_id=${req.session.user.guru_id}`);
  return {
    props: {
      absen,
      kelasData,
    },
  };
});

const DashboardGuru = ({ absen, kelasData }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <GuruStudentAttendance data={absen} kelas={kelasData} />
      </Grid>
    </Grid>
  );
};

export default DashboardGuru;
