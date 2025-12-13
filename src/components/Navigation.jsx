import { ArrowUpwardRounded } from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from "react";
import avatar from "../assets/images/ilkin_logo_circle.png";

const drawerWidth = 240;
const navItems = [['Expertise', 'expertise'], ['History', 'history'], ['Projects', 'projects'], ['Contact', 'contact']];

function Navigation({ parentToChild, modeChange }) {

  const { mode } = parentToChild;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (navbar) {
        const scrolled = window.scrollY > navbar.clientHeight;
        setScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Element with id "${section}" not found`);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" id="navigation" className={`navbar-fixed-top${scrolled ? ' scrolled' : ''}`}>
        <Toolbar className='navigation-bar'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <div className="logo-wrapper">
              <img src={avatar} alt="Avatar" />
            </div>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {navItems.map((item) => (
                <Button key={item[0]} onClick={() => scrollToSection(item[1])} sx={{ color: '#fff' }}>
                  {item[0]}
                </Button>
              ))}
            </Box>
            <Box sx={{ marginLeft: 2 }}>
              {mode === 'dark' ? (
                <LightModeIcon onClick={modeChange} />
              ) : (
                <DarkModeIcon onClick={modeChange} />
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
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
          <Box className="navigation-bar-responsive" onClick={handleDrawerToggle} sx={{ textAlign: 'left' }}>
            <p className="mobile-menu-top"><ListIcon />Menu</p>
            <Divider />
            <List>
              {navItems.map((item) => (
                <ListItem className="list_item" key={item[0]} disablePadding>
                  <ListItemButton sx={{ textAlign: 'left' }} onClick={() => scrollToSection(item[1])}>
                    <ListItemText primary={item[0]} />
                  </ListItemButton>
                  <ArrowUpwardRounded/>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;
