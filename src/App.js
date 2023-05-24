import Layout from './components/Layout/Layout';
import { Routes, Route } from "react-router-dom";
import RegisterUser from './pages/RegisterUser';
import Login from './pages/Login';
import Home from './pages/Home'
import Venue from './pages/Venue';
import Profile from './pages/Profile';
import CreateVenue from './pages/CreateVenue';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {

  const theme = createTheme({
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            backgroundColor: "white",
            "&.Mui-disabled": {
              "backgroundColor": "#cecece",
              '&:hover': {
                background: "#f00",
             },
              ":not(.Mui-selected)": {
                "color": "black",
              }
            },
          },
        },
      },
    },
  });

  return (
    <>
    <ThemeProvider theme={theme}>
    <Layout>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/venues/:id" element={<Venue/>}/>
      <Route path="/register" element={<RegisterUser/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/createvenue" element={<CreateVenue/>}/>
      <Route path="*" element={<p>Not Found</p>}/>
    </Routes>
    </Layout>
    </ThemeProvider>
    </>
  );
}

export default App;
