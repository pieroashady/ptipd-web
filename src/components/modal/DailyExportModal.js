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
import ServiceAdapter from "../../../lib/service";
import useHandleModal from "../../hooks/useHandleModal";
import moment from "moment";
import * as FileDownload from "js-file-download";

const upTransition = Transition("up");

const DailyExportModal = ({ open = false, closeModalHandler, type, data }) => {
  const router = useRouter();
  const [dailyValue, setdailyValue] = React.useState(null);
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [kelasData, setKelasData] = useState();

  useEffect(() => {
    const getKelasData = async () => {
      const response = await getKelas();
      setKelasData(response);
    };
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
      const { kelas_id } = event.target;
      const date = moment(dailyValue).format("YYYY-MM-DD");
      const response = await ServiceAdapter().get("/absen-siswa-export", {
        params: {
          kelas_id: kelas_id.value,
          type: "harian",
          date: date,
        },
        responseType: "blob",
      });
      FileDownload(response.data, `rekap-absen-${date}.xlsx`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
        open={open && type === "daily"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Rekap Harian
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="input-kelas">Kelas</CustomFormLabel>
              <CustomSelect
                required
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

              <CustomFormLabel>Tanggal Rekap</CustomFormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={dailyValue}
                  onChange={(value) => {
                    setdailyValue(value);
                    console.log(value);
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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              Download
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

export default DailyExportModal;
