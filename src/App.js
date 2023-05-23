import Layout from './components/Layout/Layout';
import { Routes, Route } from "react-router-dom";
import RegisterUser from './pages/RegisterUser';
import Login from './pages/Login';
import Home from './pages/Home'
import Venue from './pages/Venue';
import Profile from './pages/Profile';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {

  const theme = createTheme({
    components: {
      // Name of the component
      MuiPickersDay: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: "white",
            // add variant styles like so
            "&.Mui-disabled": {
              "backgroundColor": "#ff9ab1",
              ":not(.Mui-selected)": {
                "color": "white",
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
      <Route path="*" element={<p>Not Found</p>}/>
    </Routes>
    </Layout>
    </ThemeProvider>
    </>
  );
}

export default App;
