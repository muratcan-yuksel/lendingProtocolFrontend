import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import WalletComponent from "./WalletComponent";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          background: `linear-gradient(to right, #9613a1 0%, rgba(161, 198, 255, 1) 100%)`,
        }}
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Lending Protocol
          </Typography>
          <WalletComponent />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
