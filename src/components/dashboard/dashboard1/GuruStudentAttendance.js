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
  MenuItem,
  InputLabel,
  Select,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import ThemeSelect from './ThemeSelect';
import DashboardCard from '../../baseCard/DashboardCard';

import ThreeDotsMenu from '../../menu-items/ThreeDotsMenu';
import SeachDataForm from '../../forms/SearchDataForm';
import moment from 'moment';
import useAbsenList from '../../../hooks/useAbsenList';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CustomSelect from '../../forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../forms/custom-elements/CustomFormLabel';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import CustomTextField from '../../forms/custom-elements/CustomTextField';
import axios from 'axios';
import ServiceAdapter from '../../../../lib/service';
import useHandleModal from '../../../hooks/useHandleModal';
import DailyExportModal from '../../modal/DailyExportModal';
import MonthlyExportModal from '../../modal/MonthlyExportModal';

const GuruStudentAttendance = ({ data, kelas }) => {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDaily, setOpenDaily] = React.useState(false);
  const [openMonthly, setOpenMonthly] = React.useState(false);
  const [monthlyValue, setMonthlyValue] = React.useState(null);
  const { openModal, modalType, handleCloseModal, handleOpenModal } = useHandleModal(false);

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

  const handleMapelChange = (e) => router.replace(`${router.pathname}?id=${e.target.value}`);

  return (
    <DashboardCard
      title="Data Kehadiran Siswa"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
      action={
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <CustomFormLabel>Pilih Mata Pelajaran</CustomFormLabel>
            <CustomSelect
              InputLabelProps={{
                style: { color: 'black' },
              }}
              required
              defaultValue={router.query.id}
              placeholder="Kelas"
              id="jurusan_id"
              name="jurusan_id"
              fullWidth
              size="small"
              onChange={handleMapelChange}
            >
              {kelas &&
                kelas.data.map((option, index) => (
                  <MenuItem key={`kelas${option.id}`} value={option.id}>
                    {option.kelas.nama_kelas} - {option.mata_pelajaran.nama_mapel}
                  </MenuItem>
                ))}
            </CustomSelect>
          </Grid>

          <Grid item lg={6}>
            <CustomFormLabel>Cari</CustomFormLabel>
            <SeachDataForm placeholder="NIS atau nama siswa" onKeyPress={keyPress} />
          </Grid>

          <Grid item lg={6}>
            <CustomFormLabel>Rekap</CustomFormLabel>
            <Grid container spacing={2}>
              <Grid item>
                <Button color="primary" variant="contained" onClick={() => handleOpenModal('daily')}>
                  Rekap Harian
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" onClick={() => handleOpenModal('monthly')}>
                  Rekap Bulanan
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={6}>
            <CustomFormLabel>Refresh</CustomFormLabel>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    router.replace({
                      pathname: router.pathname,
                      query: router.query,
                    })
                  }
                >
                  Refresh
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    >
      <DailyExportModal open={openModal} type={modalType} closeModalHandler={handleCloseModal} />
      <MonthlyExportModal open={openModal} type={modalType} closeModalHandler={handleCloseModal} />
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
            {data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((absen) => (
              <TableRow key={absen.id}>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {absen.siswa.nis}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{absen.siswa.nama_siswa}</Typography>
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
          count={data.meta.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return `Menampilkan ${from}-${to} dari ${count !== -1 ? count : `more than ${to}`} data`;
          }}
          labelRowsPerPage="Data per halaman"
        />
      </Box>
    </DashboardCard>
  );
};

export default GuruStudentAttendance;
