import { Box, Typography } from "@mui/material";
import NavbarComponent from "./components/NavbarComponent.jsx";
import CardComponent from "./components/CardComponent.jsx";
import "./App.css";
import {
  lendingProtocolAbi,
  protocol_contract_address,
} from "./ABI/lendingProtocolAbi.js";
import { useReadContract, useAccount } from "wagmi";
import { formatEther, formatUnits } from "viem";
const App = () => {
  const { address, status, isConnected } = useAccount();

  const totalLiquidity = useReadContract({
    abi: lendingProtocolAbi,
    address: protocol_contract_address,
    functionName: "getTotalLiquidity",
  });
  console.log("Total liquidity: ", formatUnits(totalLiquidity.data, 18));

  const totalETHLocked = useReadContract({
    abi: lendingProtocolAbi,
    address: protocol_contract_address,
    functionName: "getTotalEthLocked",
  });

  console.log("Total ETH locked: ", formatEther(totalETHLocked.data));
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
      <Box>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "white" }}
        >
          Total Liquidity: {formatUnits(totalLiquidity.data, 18)}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "white" }}
        >
          Total ETH Locked: {formatEther(totalETHLocked.data)}
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
