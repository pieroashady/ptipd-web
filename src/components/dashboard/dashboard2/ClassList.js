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
} from "@mui/material";
import DashboardCard from "../../baseCard/DashboardCard";

import img1 from "../../../../assets/images/users/1.jpg";
import img2 from "../../../../assets/images/users/2.jpg";
import img3 from "../../../../assets/images/users/3.jpg";
import img4 from "../../../../assets/images/users/4.jpg";
import img5 from "../../../../assets/images/users/5.jpg";
import ThreeDotsMenu from "../../menu-items/ThreeDotsMenu";
import SeachDataForm from "../../forms/SearchDataForm";
import moment from "moment";

const ClassList = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <DashboardCard
      title="Data Kelas"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
      action={<SeachDataForm />}
    >
      <Box
        sx={{
          overflow: "auto",
          mt: -3,
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
                <Typography variant="h5">Nama Kelas</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Jurusan</Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="h5">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((kelas) => (
              <TableRow key={kelas.id}>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {kelas.nama_kelas}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {kelas.jurusan.nama_jurusan}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <ThreeDotsMenu data={kelas} />
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

export default ClassList;
