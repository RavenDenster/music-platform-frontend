import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const drawerWidth = 200;

interface Props {
  window?: () => Window;
}

const menuItems = [
    {text: 'Главная', href: '/'},
    {text: 'Список треков', href: '/tracks'},
    {text: 'Список альбомов', href: '/albums'},
]

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {setActiveTrack} = useActions()
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeActive = () => {
    setActiveTrack(null)
  }

  const drawer = (
    <div>
      <Toolbar />
      <List>
      <Typography variant='h5' sx={{margin: '20px 0px 30px', textAlign: 'center'}}>Music Platform</Typography>
      <Divider sx={{borderColor: 'rgba(255, 255, 255, 0.54)'}}/>
        {menuItems.map(({text, href}, index) => (
          <Link style={{textDecoration: 'none'}} onClick={changeActive} key={text} href={href}>
            <ListItem sx={{color: 'rgba(255, 255, 255, 0.54)'}} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: 'rbg(255, 255, 255)'}}>
                  {index == 0 && <MusicNoteIcon sx={{color: 'rgba(255, 255, 255, 0.54)'}}/>}
                  {index == 1 && <ArtTrackIcon sx={{color: 'rgba(255, 255, 255, 0.54)'}}/>}
                  {index == 2 && <AlbumIcon sx={{color: 'rgba(255, 255, 255, 0.54)'}}/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider sx={{borderColor: 'rgba(255, 255, 255, 0.54)'}}/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'rgb(0, 0, 0)',
        }}
      >
        <Toolbar sx={{ mr: 2, background: 'rgb(0, 0, 0)', display: { sm: 'none' } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth },  flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,  background: 'black',
            color: 'white' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,  background: 'black',
            color: 'white' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}