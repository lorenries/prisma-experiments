import { ThemeProvider } from "theme-ui";
import theme from "../lib/theme";
import "./App.module.scss";

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <main>{children}</main>
  </ThemeProvider>
);
