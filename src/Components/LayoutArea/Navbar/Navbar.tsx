import AdminNavbar from "../../AdminArea/AdminNavbar/AdminNavbar";
import "./Navbar.css";
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
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { authStore } from "../../../Redux/OurStore";
import { useNavigate } from "react-router-dom";


function Navbar(): JSX.Element {
    const pages = [''];
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
      
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
        };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        };
      
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
        };
      
    const handleCloseUserMenu = () => {
       setAnchorElUser(null);
         };


    return (
        <div className="Navbar">

        <AppBar position="static"  style={ {backgroundColor: '#301934' } }>
        <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inheblrit',
              textDecoration: 'none',
            }}
          >
            <img id="logo" src="\images\couponsIcon.png" alt="coupons site logo" />
          </Typography>
         

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar1"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}  sx={{
                  '&:hover': {
                    border: '2px solid #FFFFFF !important',
                  },
                }}
              >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
                
              ))}
            </Menu>
          </Box>
          {/* <img src="/images/couponsIcon.png" alt="Coupons Icon" style={{ display: 'flex', marginRight: 1 }}/> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {authStore.getState().user?.role == 'customer' && <Box sx={{flexGrow: 0, marginRight: '80px'}}>
          <IconButton onClick={() => navigate("/customer/getMyCoupons")}>
            <ShoppingCartCheckoutIcon style={{ fontSize: 25, color: 'white' }}/>
          </IconButton>
          </Box>}

          <Box sx={{flexGrow: 0, marginRight: '20px'}}>
            <AuthMenu/>
          </Box>

        
          <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                {authStore.getState().user?.role == 'company' && <Avatar sx={{ fontSize: "small",bgcolor: "purple"}}>{authStore.getState().user.name}</Avatar>}
                {authStore.getState().user?.role == 'admin' && <Avatar sx={{ fontSize: "small",bgcolor: "purple"}}>Admin</Avatar>}
                {authStore.getState().user?.role == 'customer' && <Avatar sx={{ fontSize: "small",bgcolor: "purple"}}>{authStore.getState().user.firstName}</Avatar>}
              </IconButton>
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
            </Menu>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  
    

    
        </div>
    );
}

export default Navbar;
