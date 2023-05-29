import DrawerAppBar from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";

const Layout = ({children}) => {
    return (
      <>
      <DrawerAppBar/>
        <main>
          <Box sx={{
            minHeight: '100vh',
          }}>
          {children}  
          </Box>
        </main>
      <Footer/>
      </>
    )
  }
  
  export default Layout;
  