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
import useUpdate from "../../hooks/useUpdateData";
import { getJurusan } from "../../../lib/service/jurusan";
import { getTeachers } from "../../../lib/service/guru";
import { getMapel } from "../../../lib/service/mapel";

const upTransition = Transition("up");

const UpdateJadwalMapelModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
}) => {
  const router = useRouter();
  const { handleUpdate } = useUpdate();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [guruData, setGuruData] = useState();
  const [mapelData, setMapelData] = useState();
  const [kelasData, setKelasData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getGuruData = async () => {
      const response = await getTeachers();
      setGuruData(response);
    };
    const getMapelData = async () => {
      const response = await getMapel();
      setMapelData(response);
    };
    const getKelasData = async () => {
      const response = await getKelas();
      setKelasData(response);
    };
    getGuruData();
    getMapelData();
    getKelasData();
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
      const { guru_id, kelas_id, mata_pelajaran_id } = target;

      const body = {
        guru_id: guru_id.value,
        kelas_id: kelas_id.value,
        mata_pelajaran_id: mata_pelajaran_id.value,
      };

      await handleUpdate("/jadwal-mapel", data.id, body);
      setLoading(false);
      alert("Berhasil edit data guru mapel");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal edit data guru mapel");
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
        open={open & (type === "update")}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Edit Guru Mapel
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="input-guru">Guru</CustomFormLabel>
              <CustomSelect
                required
                defaultValue={data.guru_id}
                disabled
                id="guru_id"
                name="guru_id"
                fullWidth
                variant="outlined"
                size="small"
              >
                {guruData &&
                  guruData.data.map((option, index) => (
                    <MenuItem key={`guru${option.id}`} value={option.id}>
                      {option.nama_guru}
                    </MenuItem>
                  ))}
              </CustomSelect>

              <CustomFormLabel htmlFor="input-kelas">Kelas</CustomFormLabel>
              <CustomSelect
                required
                defaultValue={data.kelas_id}
                id="kelas_id"
                name="kelas_id"
                fullWidth
                variant="outlined"
                size="small"
              >
                {kelasData &&
                  kelasData.data.map((option, index) => (
                    <MenuItem key={`kelas${option.id}`} value={option.id}>
                      {option.nama_kelas}
                    </MenuItem>
                  ))}
              </CustomSelect>

              <CustomFormLabel htmlFor="input-kelas">
                Mata Pelajaran
              </CustomFormLabel>
              <CustomSelect
                required
                defaultValue={data.mata_pelajaran_id}
                id="mata_pelajaran_id"
                name="mata_pelajaran_id"
                fullWidth
                variant="outlined"
                size="small"
              >
                {mapelData &&
                  mapelData.data.map((option, index) => (
                    <MenuItem key={`kelas${option.id}`} value={option.id}>
                      {option.nama_mapel}
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
              {loading ? "Submitting..." : "Edit"}
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

export default UpdateJadwalMapelModal;
