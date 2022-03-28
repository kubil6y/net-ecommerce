import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Routes } from "../Routes";
import { ToastContainer } from "react-toastify";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../utils";
import { agent } from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const paletteMode = isDarkMode ? "dark" : "light";
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: {
        default: isDarkMode ? "#121212" : "#eaeaea",
      },
    },
  });

  if (loading) {
    return <LoadingComponent />;
  }

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
