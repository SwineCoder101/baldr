import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import theme from "../src/styles/theme.js";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
