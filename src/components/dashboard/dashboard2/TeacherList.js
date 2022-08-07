import React from 'react';

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from '@mui/material';
import DashboardCard from '../../baseCard/DashboardCard';

import ThreeDotsMenu from '../../menu-items/ThreeDotsMenu';
import SeachDataForm from '../../forms/SearchDataForm';
import moment from 'moment';
import useHandleModal from '../../../hooks/useHandleModal';
import AddGuruModal from '../../modal/AddGuruModal';
import TeacherActionMenu from '../../menu-items/TeacherActionMenu';

const TeacherList = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <DashboardCard
      title="Data Guru"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
      action={<SeachDataForm />}
    >
      <AddGuruModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <Box sx={{ mb: 2 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenModal('add')}
        >
          Tambah Guru
        </Button>
      </Box>
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
                <Typography variant="h5">NIP</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Nama</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Jenis Kelamin</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Tempat Lahir</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Tgl Lahir</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((guru) => (
                <TableRow key={guru.id}>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {guru.nip}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{guru.nama_guru}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {guru.jenis_kelamin == '1' ? 'Laki-laki' : 'Perempuan'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {guru.tempat_lahir}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {moment(guru.tanggal_lahir).format('DD-MM-YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <TeacherActionMenu data={guru} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.data.length}
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

export default TeacherList;
