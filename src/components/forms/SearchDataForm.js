import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Select, MenuItem, InputBase } from "@mui/material";
import CustomTextField from "./custom-elements/CustomTextField";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "&  .MuiInputBase-root": {
    borderRadius: "5px",
  },
  "& .MuiInputBase-input": {
    backgroundColor:
      theme.palette.mode === "light" ? "white" : theme.palette.grey.A400,
    borderRadius: 5,
    fontSize: 15,
    padding: "8px 33px 8px 16px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: "1px solid rgba(0,0,0,0.12)",
  },
}));

const SeachDataForm = ({ placeholder = "Cari", onKeyPress }) => {
  const [age, setAge] = React.useState("10");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <CustomTextField
      id="email-text"
      type="email"
      variant="outlined"
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      fullWidth
      size="small"
    />
  );
};

export default SeachDataForm;
