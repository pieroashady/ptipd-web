import React from 'react';

import FeatherIcon from 'feather-icons-react';
import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import useUpdate from '../../hooks/useUpdateData';
import UpdateAbsenModal from '../modal/UpdateAbsenModal';
import useHandleModal from '../../hooks/useHandleModal';
import AddJurusanModal from '../modal/AddJurusanModal';
import UpdateJurusanModal from '../modal/UpdateJurusanModal';
import UpdateStudentModal from '../modal/UpdateStudentModal';
import UpdateTeacherModal from '../modal/UpdateTeacherModal';
import DeleteGuruModal from '../modal/DeleteGuruModal';

const TeacherActionMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  function handleMenuClick(Val1) {
    console.log(Val1);
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data } = props;

  return (
    <>
      {openModal && (
        <>
          <UpdateTeacherModal
            open={openModal}
            type={modalType}
            closeModalHandler={handleCloseModal}
            data={data}
          />
          <DeleteGuruModal
            open={openModal}
            type={modalType}
            closeModalHandler={handleCloseModal}
            data={data}
          />
        </>
      )}
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="action"
        size="large"
      >
        <FeatherIcon icon="more-horizontal" />
      </IconButton>
      <Menu
        id="card-actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleOpenModal('update')}>Edit</MenuItem>
        <MenuItem onClick={() => handleOpenModal('delete')}>Hapus</MenuItem>
      </Menu>
    </>
  );
};

export default TeacherActionMenu;
