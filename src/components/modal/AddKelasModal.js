import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import PhoneInput from "react-phone-input-2";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../hooks/useSnackbar";

import CustomFormLabel from "../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../forms/custom-elements/CustomTextField";
import Transition from "../transition";
import useCreateData from "../../hooks/useCreateData";
import CustomSelect from "../forms/custom-elements/CustomSelect";
import gender from "../../../lib/constant/gender";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { getKelas } from "../../../lib/service/kelas";
import { uploadFile } from "../../../lib/service/upload-file";
import { useRouter } from "next/dist/client/router";
import { getJurusan } from "../../../lib/service/jurusan";

const upTransition = Transition("up");

const AddKelasModal = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const { handleCreate } = useCreateData();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [jurusanData, setJurusanData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getJurusanData = async () => {
      const response = await getJurusan();
      setJurusanData(response);
    };
    getJurusanData();
  }, []);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </React.Fragment>
  );

  const create = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const { target } = event;
      const { nama_kelas, jurusan_id } = target;

      const data = {
        nama_kelas: nama_kelas.value,
        jurusan_id: jurusan_id.value,
      };

      await handleCreate("/kelas", data);
      setLoading(false);
      openSnackBar("Berhasil menambahkan kelas");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal mendaftarkan kelas");
      return;
    }
  };

  return (
    <>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <Dialog
        open={open & (type === "add")}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Tambah Kelas
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="input-name">Nama Kelas</CustomFormLabel>
              <CustomTextField
                required
                id="nama_kelas"
                name="nama_kelas"
                fullWidth
                size="small"
                variant="outlined"
              ></CustomTextField>

              <CustomFormLabel htmlFor="input-kelas">Jurusan</CustomFormLabel>
              <CustomSelect
                required
                id="jurusan_id"
                name="jurusan_id"
                fullWidth
                variant="outlined"
                size="small"
              >
                {jurusanData &&
                  jurusanData.data.map((option, index) => (
                    <MenuItem key={`kelas${option.id}`} value={option.id}>
                      {option.nama_jurusan}
                    </MenuItem>
                  ))}
              </CustomSelect>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              {loading ? "Submitting..." : "Tambah"}
            </Button>
            <Button onClick={closeModalHandler} color="secondary">
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddKelasModal;
