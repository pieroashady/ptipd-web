import React from "react";

import FeatherIcon from "feather-icons-react";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import useHandleModal from "../../hooks/useHandleModal";
import UpdateKelasModal from "../modal/UpdateKelasModal";
import UpdateJadwalMapelModal from "../modal/UpdateJadwalMapelModal";

const JadwalMapelActionMenu = (props) => {
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
        <UpdateJadwalMapelModal
          open={openModal}
          type={modalType}
          closeModalHandler={handleCloseModal}
          data={data}
        />
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
        <MenuItem onClick={() => handleOpenModal("update")}>Edit</MenuItem>
        <MenuItem onClick={() => handleMenuClick(data.id)}>Hapus</MenuItem>
      </Menu>
    </>
  );
};

export default JadwalMapelActionMenu;
