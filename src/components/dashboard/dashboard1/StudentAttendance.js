import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TablePagination,
  Grid,
} from '@mui/material';
import ThemeSelect from './ThemeSelect';
import DashboardCard from '../../baseCard/DashboardCard';

import ThreeDotsMenu from '../../menu-items/ThreeDotsMenu';
import SeachDataForm from '../../forms/SearchDataForm';
import moment from 'moment';
import useAbsenList from '../../../hooks/useAbsenList';
import { isEmpty } from 'ramda';

const StudentAttendance = ({ data }) => {
  const router = useRouter();
  const { absen } = useAbsenList(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const keyPress = (e) => {
    if (e.key == 'Enter') {
      if (e.target.value) {
        return router.replace(`${router.pathname}?q=${e.target.value}`);
      }
      return router.replace(`${router.pathname}`);
    }
  };

  if (!absen) return <></>;

  return (
    <DashboardCard
      title="Data Kehadiran Siswa"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
      action={
        <SeachDataForm
          placeholder="Cari berdasarkan NIS atau nama siswa"
          onKeyPress={keyPress}
        />
      }
    >
      <Box
        sx={{
          overflow: 'auto',
          mt: -1,
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5">NIS</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Nama</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Kelas</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Tanggal</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Jam Masuk</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Jam Keluar</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Status</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {absen.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((absen) => (
                <TableRow key={absen.id}>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {absen.siswa.nis}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {absen.siswa.nama_siswa}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{absen.siswa.kelas.nama_kelas}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {moment(absen.tanggal).format('DD-MM-YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {absen.jam_masuk}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {absen.jam_keluar || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {absen.keterangan || 'Hadir'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <ThreeDotsMenu data={absen} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={absen.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return `Menampilkan ${from}-${to} dari ${
              count !== -1 ? count : `more than ${to}`
            } data`;
          }}
          labelRowsPerPage="Data per halaman"
        />
      </Box>
    </DashboardCard>
  );
};

export default StudentAttendance;
