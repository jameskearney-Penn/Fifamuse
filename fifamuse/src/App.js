import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightBlue, amber } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import ClubsPage from "./pages/ClubsPage";
import PlayerInfoPage from "./pages/PlayerInfoPage";
import ClubInfoPage from "./pages/ClubInfoPage";
import CountriesPage from "./pages/CountriesPage";

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: lightBlue,
    secondary: amber,
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/player/:name" element={<PlayerInfoPage />} />
          <Route path="/club/:name" element={<ClubInfoPage />} />
          <Route path="/players" element={<PlayersPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
