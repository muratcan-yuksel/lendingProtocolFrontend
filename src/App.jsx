import { Box } from "@mui/material";
import NavbarComponent from "./components/NavbarComponent.jsx";
import CardComponent from "./components/CardComponent.jsx";
import "./App.css";
import {
  lendingProtocolAbi,
  protocol_contract_address,
} from "./ABI/lendingProtocolAbi.js";
import { useReadContract, useAccount } from "wagmi";
const App = () => {
  const { address, isConnected } = useAccount();
  //lender functions
  console.log(address);

  const lenderinfo = useReadContract({
    abi: lendingProtocolAbi,
    address: protocol_contract_address,
    functionName: "getLenderInfo",
    args: [address],
  });
  console.log(lenderinfo.data);

  //borrower functions
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
        {/* lender */}
        <CardComponent userInfo={lenderinfo.data} />
        {/* borrower */}
        {/* <CardComponent /> */}
      </Box>
    </Box>
  );
};

export default App;
