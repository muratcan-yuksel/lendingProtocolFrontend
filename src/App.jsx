import { Box } from "@mui/material";
import NavbarComponent from "./components/NavbarComponent.jsx";
import CardComponent from "./components/CardComponent.jsx";
import "./App.css";
const App = () => {
  return (
    <Box>
      <NavbarComponent />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          border: "1px solid red",
        }}
      >
        <CardComponent />
        <CardComponent />
      </Box>
    </Box>
  );
};

export default App;
