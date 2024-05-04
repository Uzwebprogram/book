import * as React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Container,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu
} from "@mui/material";
import Logo from "../../assets/logo.svg";
import { HeaderProps } from "./header.props";


const Header: React.FC<HeaderProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userData, setUserData] = React.useState<{ data: { name: string, email: string } } | null>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("userData")
    window.location.reload()
  };

  React.useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <img src={Logo} alt="" />

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge color="error">
                  <NotificationsIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircle sx={{ color: "white" }} />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}><AccountCircle sx={{ marginRight: "10px" }} />{userData?.data.name}</MenuItem>
                <MenuItem onClick={handleClose}><EmailIcon sx={{ marginRight: "10px" }} /> {userData?.data.email}</MenuItem>
                <MenuItem onClick={handleLogOut}><LogoutIcon sx={{ marginRight: "10px" }} />Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header
