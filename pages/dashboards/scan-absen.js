import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { isEmpty } from "ramda";
import Image from "next/image";

import { getAbsenSiswa } from "../../lib/service/absen-siswa";
import { getQrCode } from "../../lib/service/qr-code";
import StudentAttendance from "../../src/components/dashboard/dashboard1/StudentAttendance";
import QRCodeCard from "../../src/components/dashboard/dashboard1/QRCodeCard";

export async function getServerSideProps({ query }) {
  const today = moment().startOf("day").format("YYYY-MM-DD");

  const search = isEmpty(query)
    ? `tanggal=${today}`
    : `tanggal=${today}&${new URLSearchParams(query).toString()}`;

  const absen = await getAbsenSiswa(`${search}`);
  const qrCode = await getQrCode();

  return {
    props: {
      absen,
      qrCode,
    },
  };
}

const ScanAbsen = ({ absen, qrCode }) => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={12} sx={{ mb: 4 }}>
        <Typography variant="h1" fontSize={40} textAlign={"center"}>
          PUSAT INFORMASI DAN PANGKALAN DATA TKJ SMKN 5 KAB. TANGERANG
        </Typography>
      </Grid>
      <Grid item lg={4}>
        <QRCodeCard qrCode={qrCode.data.qr_code} />
      </Grid>
      <Grid item xs={12} lg={8}>
        <StudentAttendance data={absen} />
      </Grid>
    </Grid>
  );
};

export default ScanAbsen;
