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
  const { address, status, isConnected } = useAccount();
  //lender functions
  console.log(address);
  console.log(isConnected);
  console.log(status);

  const lenderinfo = useReadContract({
    abi: lendingProtocolAbi,
    address: protocol_contract_address,
    functionName: "getLenderInfo",
    args: [address],
  });
  console.log(lenderinfo.data);

  //borrower functions

  const borrowerinfo = useReadContract({
    abi: lendingProtocolAbi,
    address: protocol_contract_address,
    functionName: "getBorrowerInfo",
    args: [address],
  });
  console.log(borrowerinfo.data);
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
        {status === "connected" && (
          <>
            <Box>
              <h2>Lender</h2>
              <CardComponent userInfo={lenderinfo.data} position={"lender"} />
            </Box>
            <Box>
              <h2>Borrower</h2>
              <CardComponent
                userInfo={borrowerinfo.data}
                position={"borrower"}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default App;
