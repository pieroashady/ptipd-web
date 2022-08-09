import React, { useEffect, useState } from 'react';

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
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import PhoneInput from 'react-phone-input-2';

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import 'react-phone-input-2/lib/material.css';
import { useSnackbar } from '../../hooks/useSnackbar';

import CustomFormLabel from '../forms/custom-elements/CustomFormLabel';
import CustomTextField from '../forms/custom-elements/CustomTextField';
import Transition from '../transition';
import useCreateData from '../../hooks/useCreateData';
import CustomSelect from '../forms/custom-elements/CustomSelect';
import gender from '../../../lib/constant/gender';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { getKelas } from '../../../lib/service/kelas';
import { uploadFile } from '../../../lib/service/upload-file';
import { useRouter } from 'next/dist/client/router';
import ServiceAdapter from '../../../lib/service';
import useHandleModal from '../../hooks/useHandleModal';
import moment from 'moment';
import * as FileDownload from 'js-file-download';

const upTransition = Transition('up');

const UpdateTahunAjaranModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
}) => {
  const router = useRouter();
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
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
      const start = moment(startDate).format('YYYY-MM-DD');
      const end = moment(endDate).format('YYYY-MM-DD');
      await ServiceAdapter().put(`/tahun-ajaran/${data.id}`, {
        mulai_tahun_ajaran: start,
        akhir_tahun_ajaran: end,
      });
      openSnackBar('Data berhasil di update');
      router.replace(router.pathname);
      closeModalHandler();
      setLoading(false);
    } catch (error) {
      openSnackBar('Data gagal di update');
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
        open={open && type === 'update'}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Update Tahun Ajaran
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel>Mulai Tahun Ajaran</CustomFormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={startDate}
                  onChange={(value) => {
                    setStartDate(value);
                    console.log(value);
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      size="small"
                      {...params}
                      fullWidth
                      id="date"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          width: '18px',
                          height: '18px',
                        },
                        '& .MuiFormHelperText-root': {
                          display: 'none',
                        },
                        mb: 1,
                      }}
                    />
                  )}
                />
              </LocalizationProvider>

              <CustomFormLabel>Akhir Tahun Ajaran</CustomFormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  minDate={startDate}
                  value={endDate}
                  onChange={(value) => {
                    setEndDate(value);
                    console.log(value);
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      size="small"
                      {...params}
                      fullWidth
                      id="date"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          width: '18px',
                          height: '18px',
                        },
                        '& .MuiFormHelperText-root': {
                          display: 'none',
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
              {loading ? 'Menyimpan...' : 'Update'}
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

export default UpdateTahunAjaranModal;
