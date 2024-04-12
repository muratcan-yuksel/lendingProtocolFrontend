import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import Button from "@mui/material/Button";
import { useReadContract } from "wagmi";
import { useWriteContract } from "wagmi";
import { lendingProtocolAbi } from "./ABI/lendingProtocolAbi.js";
import { tokenAbi } from "./ABI/tokenAbi.js";
import { Box } from "@mui/material";
import { useBalance } from "wagmi";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

const App = () => {
  const { connect } = useConnect();
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  const { address, isConnected } = useAccount();
  console.log(address);
  console.log(isConnected);

  const result = useReadContract({
    abi: lendingProtocolAbi,
    address: "0x946Ee3d3D964148CE930Ff2e7A6f5e6585336F21",
    functionName: "getBorrowerInfo",
    args: ["0x1AF34385343fdf673aedB90A26ee64Bb01e1667D"],
  });
  console.log(result);

  const tokenResult = useBalance({
    address: "0x1AF34385343fdf673aedB90A26ee64Bb01e1667D",
    token: "0x8615D77790F8A14E2dC996ba1eD7F040cE6A1d2B",
  });

  console.log(tokenResult.data);

  const liquidity = useReadContract({
    abi: lendingProtocolAbi,
    address: "0x946Ee3d3D964148CE930Ff2e7A6f5e6585336F21",
    functionName: "getTotalLiquidity",
  });
  const lenderinfo = useReadContract({
    abi: lendingProtocolAbi,
    address: "0x946Ee3d3D964148CE930Ff2e7A6f5e6585336F21",
    functionName: "getLenderInfo",
    args: ["0x1AF34385343fdf673aedB90A26ee64Bb01e1667D"],
  });
  console.log(lenderinfo.data);

  const callDepositLPT = () => {
    if (!isConnected) {
      console.log("User not connected");
      return;
    }

    try {
      writeContract({
        abi: lendingProtocolAbi,
        address: "0x946Ee3d3D964148CE930Ff2e7A6f5e6585336F21",
        functionName: "depositLPT",
        args: [parseEther("10")],
      });
      console.log(error);
    } catch (err) {
      console.log(err);
    }
  };
  const handleApprove = async () => {
    try {
      writeContract({
        abi: tokenAbi,
        address: "0x8615D77790F8A14E2dC996ba1eD7F040cE6A1d2B",
        functionName: "approve",
        args: ["0x946Ee3d3D964148CE930Ff2e7A6f5e6585336F21", parseEther("10")],
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(result);

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => connect({ connector: injected() })}
      >
        Connect
      </Button>
      <button onClick={() => handleApprove()}>Approve</button>
      {
        <div>
          <p>{error !== null ? "Error" : error}</p>
          <p>{isPending ? "Pending" : ""}</p>
          <p>{isSuccess ? "Success 😀" : ""}</p>
        </div>
      }

      <button onClick={() => callDepositLPT()}>DepositLPT</button>
      {
        <div>
          <p>{error !== null ? "Error" : error}</p>
          <p>{isPending ? "Pending" : ""}</p>
          <p>{isSuccess ? "Success 😀" : ""}</p>
        </div>
      }
      {/* <p>{tokenResult.data.formatted}</p> */}
      <Box>
        {/* ... other components ... */}
        {/* {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching total liquidity</p>} */}
        {liquidity.data && <p>Total Liquidity: {liquidity.data.toString()}</p>}
      </Box>
    </Box>
  );
};
export default App;
