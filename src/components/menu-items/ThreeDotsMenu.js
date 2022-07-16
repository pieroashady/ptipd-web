import React from "react";

import FeatherIcon from "feather-icons-react";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

const ThreeDotsMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuClick(data.id)}>Edit</MenuItem>
        <MenuItem onClick={() => handleMenuClick(data.id)}>Hapus</MenuItem>
      </Menu>
    </>
  );
};

export default ThreeDotsMenu;
