import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

import DashboardCard from "../../baseCard/DashboardCard";

const QRCodeCard = ({ qrCode }) => {
  return (
    <DashboardCard
      title="Scan Disini"
      textAlign="center"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
    >
      <Box
        sx={{
          overflow: "auto",
          mt: -3,
        }}
      >
        <Image
          src={`data:image/svg+xml;base64,${qrCode}`}
          alt="qr"
          width={550}
          height={550}
        />
      </Box>
    </DashboardCard>
  );
};

export default QRCodeCard;
