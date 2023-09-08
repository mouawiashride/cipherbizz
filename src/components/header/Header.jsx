import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth/AuthProvider";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";


const drawerWidth = 240;

const navItems = [
  { Title: "Employee Documents", path: "/", protected: false },
  { Title: "Company Documents", path: "/Company", protected: false },
  { Title: "Login", path: "/login", protected: true },
  { Title: "Signup", path: "/register", protected: true },
];

export default function Header(props) {
  const location = useLocation();
  const { IsSignIn, SignOut } = useContext(AuthContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {navItems.map((item) => {
          return item.protected && IsSignIn ? (
            false
          ) : (
            <ListItem key={item.Title} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Tab
                  label={item.Title}
                  key={item.Title}
                  to={item.path}
                  component={Link}
                  sx={{ color: "#000" }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}

        {IsSignIn && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Tab
                label={"Log out"}
                onClick={() => {
                  SignOut();
                }}
                sx={{ color: "#000" }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex", marginBottom: "60px" }}>
      <AppBar
        position="fixed"
        component="nav"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.0)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => {
              if (item.protected && IsSignIn) return false;
              return (
                <Tab
                  label={item.Title}
                  key={item.Title}
                  to={item.path}
                  component={Link}
                  sx={{ color: `${location.pathname ===item.path ? "#933989":"#747474"}` }}
                />
              );
            })}
            {IsSignIn && (
              <Tab
                label={"Log out"}
                onClick={() => {
                  SignOut();
                }}
                sx={{ color: "#fff" }}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
