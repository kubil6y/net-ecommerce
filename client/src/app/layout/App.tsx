import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
import { Header } from "./Header";
import { Routes } from "../Routes";
import { ToastContainer } from "react-toastify";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const paletteMode = isDarkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: {
        default: isDarkMode ? "#121212" : "#eaeaea",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Container>
        <Routes />
      </Container>
    </ThemeProvider>
  );
}
