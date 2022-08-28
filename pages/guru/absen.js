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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps = withGuruAuth(async ({ req, query }) => {
  return {
    props: {
      session: req.session,
    },
  };
});

const DashboardGuru = ({ session }) => {
  const router = useRouter();
  const [absen, setAbsen] = useState();
  const [kelasData, setKelasData] = useState();
  const [qrCode, setQrCode] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const handler = async () => {
      let jadwalMapel = null;

      if (router.query?.id) {
        try {
          jadwalMapel = router.query.id ? await getJadwalMapelById(router.query.id) : null;
        } catch (error) {
          console.log(error);
        }
      }

      const today = moment().startOf('day').format('YYYY-MM-DD');

      const search = jadwalMapel
        ? `tanggal=${today}&kelas_id=${jadwalMapel.data.kelas_id}&mata_pelajaran_id=${jadwalMapel.data.mata_pelajaran_id}`
        : '';

      const absen = jadwalMapel ? await getAbsenSiswa(`${search}`) : { data: [] };
      const kelasData = await getJadwalMapel(`guru_id=${session.user.guru_id}`);
      const qrCode = router.query.id
        ? await getQrCode({
            mata_pelajaran_id: jadwalMapel.data.mata_pelajaran_id,
            kelas_id: jadwalMapel.data.kelas_id,
          })
        : null;

      setAbsen(absen);
      setKelasData(kelasData);
      setQrCode(qrCode);

      setLoading(false);
    };

    handler();
  }, [router, session.user.guru_id]);

  console.log(loading);

  if (loading) return <>Loading...</>;

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
