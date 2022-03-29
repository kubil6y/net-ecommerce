import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Routes } from "../Routes";
import { ToastContainer } from "react-toastify";
import { getCookie } from "../utils";
import { agent } from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket";

export function App() {
  const dispatch = useAppDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const paletteMode = isDarkMode ? "dark" : "light";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

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
