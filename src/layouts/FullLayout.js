import React, { useRef } from "react";
import { useRouter } from "next/router";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from "@mui/material";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import Customizer from "./customizer/Customizer";
import { useSelector } from "react-redux";
import APP_CONFIG from "../../app.config";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children }) => {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;
  const [isSidebarOpen, setSidebarOpen] = React.useState(
    routerRef.current.pathname != APP_CONFIG.reservedPath
  );
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const customizer = useSelector((state) => state.CustomizerReducer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <MainWrapper>
      <Header
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor:
            customizer.activeMode === "dark" ? "#20232a" : "#fafbfb",
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        showSidebar={router.pathname != APP_CONFIG.reservedPath}
      />
      <Sidebar
        isSidebardir={customizer.activeDir === "ltr" ? "left" : "right"}
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          <Customizer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
