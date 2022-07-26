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

const upTransition = Transition("up");

const AddGuruModal = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const { handleCreate } = useCreateData();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [tglLahir, setTglLahir] = useState(null);
  const [teacherPhoto, setTeacherPhoto] = useState(null);
  const [kelasData, setKelasData] = useState();
  const [studentPhone, setStudentPhone] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

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
      const { nip, nama_guru, jenis_kelamin, tempat_lahir } = target;

      const data = {
        nip: nip.value,
        nama_guru: nama_guru.value,
        jenis_kelamin: jenis_kelamin.value,
        tempat_lahir: tempat_lahir.value,
        tanggal_lahir: tglLahir,
        phone_number: studentPhone,
      };

      if (teacherPhoto) {
        const uploadPhoto = await uploadFile(teacherPhoto);
        data.foto_guru = uploadPhoto.url;
      }

      await handleCreate("/guru", data);
      setLoading(false);
      openSnackBar("Berhasil menambahkan guru");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal mendaftarkan guru");
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
            Tambah Guru
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="input-placement">
                Upload Foto Guru
              </CustomFormLabel>
              <Grid container>
                <Grid item display="flex">
                  <Button
                    variant="contained"
                    component="label"
                    // sx={{ mt: 1, mb: 1 }}
                  >
                    Upload Foto
                    <input
                      type="file"
                      hidden
                      name="logo"
                      accept="image/*"
                      onChange={async (e) => {
                        setTeacherPhoto(e.target.files[0]);
                      }}
                    />
                  </Button>
                </Grid>
                <Box sx={{ flex: "1 1 auto" }} />
                <Grid item display="flex" alignItems="center">
                  {teacherPhoto && <Typography>{teacherPhoto.name}</Typography>}
                </Grid>
              </Grid>

              <CustomFormLabel htmlFor="input-name">Nama Guru</CustomFormLabel>
              <CustomTextField
                required
                id="nama_guru"
                name="nama_guru"
                fullWidth
                size="small"
                variant="outlined"
              ></CustomTextField>

              <CustomFormLabel htmlFor="input-nis">
                Nomor Induk Pegawai
              </CustomFormLabel>
              <CustomTextField
                required
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                id="nip"
                name="nip"
                fullWidth
                size="small"
                variant="outlined"
              ></CustomTextField>

              <CustomFormLabel htmlFor="input-gender">
                Jenis Kelamin
              </CustomFormLabel>
              <CustomSelect
                required
                id="jenis_kelamin"
                name="jenis_kelamin"
                fullWidth
                variant="outlined"
                size="small"
              >
                {gender.map((option, index) => (
                  <MenuItem key={`desckey${index}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>

              <CustomFormLabel htmlFor="input-pob">
                Tempat Lahir
              </CustomFormLabel>
              <CustomTextField
                required
                id="tempat_lahir"
                name="tempat_lahir"
                fullWidth
                size="small"
                variant="outlined"
              ></CustomTextField>

              <CustomFormLabel htmlFor="input-placement">
                Tanggal Lahir
              </CustomFormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  required
                  value={tglLahir}
                  onChange={(value) => {
                    setTglLahir(value);
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      size="small"
                      {...params}
                      fullWidth
                      id="date"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          width: "18px",
                          height: "18px",
                        },
                        "& .MuiFormHelperText-root": {
                          display: "none",
                        },
                        mb: 1,
                      }}
                    />
                  )}
                />
              </LocalizationProvider>

              <CustomFormLabel htmlFor="Lname">
                Nomor Telfon Guru
              </CustomFormLabel>
              <Box sx={{ mt: 2, mb: 2 }}>
                <PhoneInput
                  inputProps={{
                    required: true,
                  }}
                  helperText=""
                  country="id"
                  variant="outlined"
                  onChange={(phone) => setStudentPhone(phone)}
                />
              </Box>
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

export default AddGuruModal;
