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
import AddJurusanModal from "../../modal/AddJurusanModal";
import useHandleModal from "../../../hooks/useHandleModal";
import JurusanActionMenu from "../../menu-items/JurusanActionMenu";

const JurusanList = ({ data }) => {
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
      title="Data Jurusan"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
    >
      {openModal && (
        <AddJurusanModal
          open={openModal}
          type={modalType}
          closeModalHandler={handleCloseModal}
        />
      )}
      <Box sx={{ mb: 2 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenModal("add")}
        >
          Tambah Jurusan
        </Button>
      </Box>
      <Box
        sx={{
          overflow: "auto",
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
                <Typography variant="h5">Nama Jurusan</Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="h5">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((jurusan) => (
              <TableRow key={jurusan.id}>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {jurusan.nama_jurusan}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <JurusanActionMenu data={jurusan} />
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

export default JurusanList;
