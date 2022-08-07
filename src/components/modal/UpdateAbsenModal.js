import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Snackbar,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';

import CustomFormLabel from '../forms/custom-elements/CustomFormLabel';
import CustomTextField from '../forms/custom-elements/CustomTextField';
import Transition from '../transition';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useRouter } from 'next/router';
import CustomSelect from '../forms/custom-elements/CustomSelect';
import useUpdate from '../../hooks/useUpdateData';

const upTransition = Transition('up');

const UpdateAbsenModal = ({ open = false, closeModalHandler, data, type }) => {
  const { handleUpdate } = useUpdate();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const router = useRouter();

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
        open={open & (type === 'edit')}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await handleUpdate('/absen-siswa', data.id, {
                keterangan: e.target.keterangan.value,
              });
              openSnackBar('Berhasil');
              closeModalHandler();
            } catch (error) {
              console.log(error);
              openSnackBar('Terjadi kesalahan pada server');
            }
          }}
        >
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Update Status Absen
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="input-job_category">
                Status
              </CustomFormLabel>
              <CustomSelect
                required
                id="keterangan"
                name="keterangan"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              >
                {['Izin', 'Sakit', 'Alpa'].map((option, index) => (
                  <MenuItem key={`desckey${index}`} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomSelect>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              Update
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

export default UpdateAbsenModal;
