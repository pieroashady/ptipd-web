import React from "react";
import Image from "next/image";
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
  Button,
} from "@mui/material";
import DashboardCard from "../../baseCard/DashboardCard";

import ThreeDotsMenu from "../../menu-items/ThreeDotsMenu";
import SeachDataForm from "../../forms/SearchDataForm";
import moment from "moment";
import useHandleModal from "../../../hooks/useHandleModal";
import AddSiswaModal from "../../modal/AddSiswaModal";
import { useRouter } from "next/router";
import StudentActionMenu from "../../menu-items/StudentActionMenu";

const StudentList = ({ data }) => {
  const router = useRouter();
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

  const keyPress = (e) => {
    if (e.key == "Enter") {
      if (e.target.value) {
        return router.replace(`${router.pathname}?q=${e.target.value}`);
      }
      return router.replace(`${router.pathname}`);
    }
  };

  return (
    <DashboardCard
      title="Data Siswa"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
      action={<SeachDataForm onKeyPress={keyPress} />}
    >
      <AddSiswaModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <Box sx={{ mb: 2 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenModal("add")}
        >
          Tambah Siswa
        </Button>
      </Box>
      <Box
        sx={{
          overflow: "auto",
          // mt: -3,
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
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
              .map((siswa) => (
                <TableRow key={siswa.id}>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {siswa.nis}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{siswa.nama_siswa}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {siswa.kelas.nama_kelas}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {siswa.jenis_kelamin == "1" ? "Laki-laki" : "Perempuan"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {siswa.tempat_lahir}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {moment(siswa.tanggal_lahir).format("DD-MM-YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <StudentActionMenu data={siswa} />
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

export default StudentList;
