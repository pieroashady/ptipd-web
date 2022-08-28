import { Grid } from '@mui/material';
import { isEmpty } from 'ramda';
import moment from 'moment';
import { getAbsenSiswa } from '../../lib/service/absen-siswa';
import { getKelas } from '../../lib/service/kelas';
import StudentAttendance from '../../src/components/dashboard/dashboard1/StudentAttendance';
import GuruStudentAttendance from '../../src/components/dashboard/dashboard1/GuruStudentAttendance';
import { getJadwalMapel, getJadwalMapelById } from '../../lib/service/jadwal-mapel';
import withGuruAuth from '../../lib/session/withGuruAuth';
import QRCodeCard from '../../src/components/dashboard/dashboard1/QRCodeCard';
import { getQrCode } from '../../lib/service/qr-code';

export const getServerSideProps = withGuruAuth(async ({ req, query }) => {
  let jadwalMapel = null;

  if (query.id) {
    try {
      jadwalMapel = query.id ? await getJadwalMapelById(query.id) : null;
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }

  const today = moment().startOf('day').format('YYYY-MM-DD');

  const search = !jadwalMapel
    ? `tanggal=${today}`
    : `tanggal=${today}&kelas_id=${jadwalMapel.data.kelas_id}&mata_pelajaran_id=${jadwalMapel.data.mata_pelajaran_id}`;

  const absen = await getAbsenSiswa(`${search}`);
  const kelasData = await getJadwalMapel(`guru_id=${req.session.user.guru_id}`);
  const qrCode = query.id
    ? await getQrCode({ mata_pelajaran_id: jadwalMapel.data.mata_pelajaran_id, kelas_id: jadwalMapel.data.kelas_id })
    : null;

  return {
    props: {
      absen,
      kelasData,
      qrCode,
    },
  };
});

const DashboardGuru = ({ absen, kelasData, qrCode }) => {
  return (
    <Grid container spacing={0}>
      {qrCode && (
        <Grid item lg={4}>
          <QRCodeCard qrCode={qrCode.data.qr_code} />
        </Grid>
      )}
      <Grid item xs={12} lg={qrCode ? 8 : 12}>
        <GuruStudentAttendance data={absen} kelas={kelasData} />
      </Grid>
    </Grid>
  );
};

export default DashboardGuru;
