import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import Button from "@mui/material/Button";
import { useReadContract } from "wagmi";
import { useWriteContract } from "wagmi";
import { lendingProtocolAbi } from "./ABI/lendingProtocolAbi.js";
import { tokenAbi } from "./ABI/tokenAbi.js";
import { Box } from "@mui/material";
import { useBalance } from "wagmi";

const App = () => {
  const { connect } = useConnect();
  const { writeContract, isError, isPending, isSuccess, error } =
    useWriteContract();

  const result = useReadContract({
    lendingProtocolAbi,
    address: "0xa2191808C13FE4f2666a14bcEF5d57c24472D5e4",
    functionName: "getBorrowerInfo",
    args: ["0x1AF34385343fdf673aedB90A26ee64Bb01e1667D"],
  });

  const tokenResult = useBalance({
    address: "0x1AF34385343fdf673aedB90A26ee64Bb01e1667D",
    token: "0x8615D77790F8A14E2dC996ba1eD7F040cE6A1d2B",
  });

  // console.log(tokenResult.data);

  const callRepayDebt = () => {
    try {
      writeContract({
        lendingProtocolAbi,
        address: "0xa2191808C13FE4f2666a14bcEF5d57c24472D5e4",
        functionName: "repayDebt",
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
        args: ["0xa2191808C13FE4f2666a14bcEF5d57c24472D5e4", 10],
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
      <button onClick={() => handleApprove()}>DepositLPT</button>
      {
        <div>
          <p>{error !== null ? "Error" : error}</p>
          <p>{isPending ? "Pending" : ""}</p>
          <p>{isSuccess ? "Success 😀" : ""}</p>
        </div>
      }
      {/* <p>{tokenResult.data.formatted}</p> */}
    </Box>
  );
};
export default App;
