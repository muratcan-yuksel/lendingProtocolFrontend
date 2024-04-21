import { Box, Typography } from "@mui/material";
import NavbarComponent from "./components/NavbarComponent.jsx";
import CardComponent from "./components/CardComponent.jsx";
import "./App.css";
import {
  lendingProtocolAbi,
  protocol_contract_address,
} from "./ABI/lendingProtocolAbi.js";
import { useReadContract, useAccount, useBalance } from "wagmi";
import { formatEther, formatUnits } from "viem";
const App = () => {
  const { address, status, isConnected } = useAccount();

  // const getbalance = useBalance({
  //   address: "0x655636E9f37cd425F609Eda79163DBd1f232B7B0",
  // });

  // console.log(getbalance.data);

  const totalLiquidity = useReadContract({
    abi: lendingProtocolAbi,
    address: protocol_contract_address,
    functionName: "getTotalLiquidity",
  });

  const totalETHLocked = useReadContract({
    abi: lendingProtocolAbi,
    address: protocol_contract_address,
    functionName: "getTotalEthLocked",
  });

  console.log("eth locked" + totalETHLocked?.data);

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
  // console.log("lender informationl" + lenderinfo.data);

  //borrower functions

  const borrowerinfo = useReadContract({
    abi: lendingProtocolAbi,
    address: protocol_contract_address,
    functionName: "getBorrowerInfo",
    args: [address],
  });
  // console.log("borrower information" + borrowerinfo.data.ethDeposited);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // background:
        //   "linear-gradient(90deg, rgba(104, 110, 255, 1) 0%, rgba(141, 198, 255, 1) 100%)",
      }}
    >
      <NavbarComponent />
      <Box sx={{}}>
        {status === "connected" && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: "space-around",
                margin: "5em 10px",
              }}
            >
              {" "}
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
            </Box>
          </>
        )}
      </Box>
      {/* <Box>
        {isConnected && (
          <Box>
            {" "}
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
            </Typography>{" "}
          </Box>
        )}
      </Box> */}
    </Box>
  );
};

export default App;
