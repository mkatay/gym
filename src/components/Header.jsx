import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, Outlet } from 'react-router-dom';
import { MdAdminPanelSettings } from "react-icons/md";
import { AdminPanelSettings } from '@mui/icons-material';

const pages = [
  {path:'/',name:'Főoldal'},
  {path:'/timetable',name:'Órarend'},
  {path:'/',name: 'Kapcsolat'}];
const settingsProfile = [
  {path:'profile',name:  'Fiókbeállítások'},
  {path:'profile',name:  'Kijelentkezés'},
];
const settingsDashboard=[
  {path:'/workouts',name:'Edzések'},
  {path:'/classes',name:'Órarend'},
  {path:'/workouts',name:'Edzők'},
  {path:'/workouts',name:'Tagok'},
  {path:'/workouts',name:'Foglalások'}
 ]

export const Header=()=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElDash, setAnchorElDash] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenDashMenu = (event) => {
    setAnchorElDash(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseDashMenu = () => {
    setAnchorElDash(null);
  };
  return (
    <>
    <AppBar position="sticky" className='header' sx={{top:0,zIndex:100,backgroundColor:'rgb(0,128,128)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
      
         <img src="paslogo.png" alt="logo" style={{maxWidth:"30px" ,display: 'flex', mr: 1 }}/>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
                onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu id="menu-appbar" anchorEl={anchorElNav}  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}
              keepMounted transformOrigin={{vertical: 'top',horizontal: 'left',}}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <NavLink to={page.path}>{page.name}</NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page.name} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                    <NavLink to={page.path}>{page.name}</NavLink>
              </Button>
            ))}
          </Box>
          {/*admin menu*/}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Admin panel">
              <IconButton onClick={handleOpenDashMenu} sx={{ p: 0 }}>
                <AdminPanelSettings style={{margin:'10px',color:'white'}}/>
              </IconButton>
            </Tooltip>

            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElDash} anchorOrigin={{vertical: 'top',horizontal: 'right',}}
              keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}}
              open={Boolean(anchorElDash)}
              onClose={handleCloseDashMenu}
            >
              {settingsDashboard.map((obj) => (
                <MenuItem key={obj.name} onClick={handleCloseDashMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <NavLink to={obj.path}>{obj.name}</NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>

          {/******************* */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Fiók">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top',horizontal: 'right',}}
              keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingsProfile.map((obj) => (
                <MenuItem key={obj.name} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                   <NavLink to={obj.path}>{obj.name}</NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
    <Outlet/>
    </>
  );
}

