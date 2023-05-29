import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { remove } from '../utils/storage';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/auth';

const drawerWidth = 240;
const navItems = [<Link component={RouterLink} to="/" color="inherit" underline='none'>Venues</Link>, 'About', 'Contact', 'Rent out your Venue'];
const avatarItems = ['Profile', 'Bookings'];

function DrawerAppBar(props) {

  const auth = useSelector((state) => state.auth.auth);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const dispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link to="/">
      <Typography component="h6" sx={{ my: 2 }}>
        Holidaze
      </Typography>
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate()

  const handleLogout = () => {
    remove("AuthToken")
    remove("User")
    dispatch(logout())
    navigate("/")
  }

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position='static'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component="h1"
            sx={{ flexGrow: 1 }}
          >
            <Link component={RouterLink} to="/" color="inherit" underline='none'>Holidaze</Link>
          </Typography>
            {auth ? 
            <Stack direction="row" spacing={1}> 
            <Button
            variant='outlined'
            color='primary'
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              color:"white",
              borderColor:"white"
            }}>
              <Typography>{user.user}</Typography>
            </Button>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Link component={RouterLink} underline="none" to='/profile'>
                <MenuItem onClick={handleClose}>
                <Avatar alt={user.user} src={user.avatar} /> Profile
                </MenuItem>
              </Link>
              <Link component={RouterLink} underline="none" to='/createvenue'>
                <MenuItem onClick={handleClose}>
                  List venue
                </MenuItem>
              </Link>
            <Divider />
            <Link component={RouterLink} underline="none" to='/'>
            <MenuItem onClick={handleLogout} size="small">
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
            </Link>
          </Menu>
            </Stack>
            :
            <Stack direction="row" spacing={1}>
            <Link component={RouterLink} underline="none" to='/login'>
            <Button size="small" color='secondary' variant="contained" sx={{
              backgroundColor:"white",
              color:"red"
            }}>Sign in</Button>
            </Link>
            <Link component={RouterLink} underline="none" to='/register'>
            <Button size="small" color='secondary' variant="outlined">Register</Button>
            </Link>
            </Stack> 
            }
          <Avatar onClick={handleOpenUserMenu} sx={{marginLeft: 'auto', display: 'none'}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {avatarItems.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
        </Menu>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
    </>
  );
}

export default DrawerAppBar;
