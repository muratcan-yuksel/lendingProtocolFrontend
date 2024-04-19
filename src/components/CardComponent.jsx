/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatEther, parseEther, parseUnits } from "viem";
import { useWriteContract } from "wagmi";
import {
  lendingProtocolAbi,
  protocol_contract_address,
} from "../ABI/lendingProtocolAbi";
import { tokenAbi, token_contract_address } from "../ABI/tokenAbi";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function CardComponent({ userInfo, position }) {
  const [LPTAmount, setLPTAmount] = useState(0);
  const [ETHAmount, setETHAmount] = useState(0);

  const { writeContract, isError, isPending, isSuccess } = useWriteContract();

  const handleApprove = async () => {
    try {
      writeContract({
        abi: tokenAbi,
        address: token_contract_address,
        functionName: "approve",
        args: [protocol_contract_address, parseUnits(LPTAmount, 18)],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const callDepositLPT = async () => {
    try {
      writeContract({
        abi: lendingProtocolAbi,
        address: protocol_contract_address,
        functionName: "depositLPT",
        args: [parseUnits(LPTAmount, 18)],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDepositLPT = async () => {
    console.log(LPTAmount);
    try {
      await handleApprove();
      await callDepositLPT();
    } catch (error) {
      console.log(error);
    }
  };

  const callDepositETH = async () => {
    console.log(ETHAmount);
    try {
      writeContract({
        abi: lendingProtocolAbi,
        address: protocol_contract_address,
        functionName: "depositETH",
        args: [parseEther(ETHAmount)],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const giveTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        boxShadow: "inset 4px 4px 6px 0 rgba(0, 0, 0, 0.15)",
        background: `linear-gradient(to right, #9613a1 0%, rgba(161, 198, 255, 1) 100%)`,
        borderRadius: 10, // Add some rounded corners
        color: "white",
        padding: "2em",
      }}
    >
      {" "}
      <CardContent>
        {position === "lender" ? (
          <Box>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              Amount of LPT lent to the protocol:{" "}
              {formatEther(userInfo?.amountLent || 0)}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              Interest Earned: {formatEther(userInfo?.interestEarned || 0)}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              {userInfo?.depositTime &&
                `Deposit Time: ${giveTimestamp(userInfo.depositTime)}`}
            </Typography>
            <TextField
              id="outlined-number"
              type="number"
              onChange={(e) => setLPTAmount(e.target.value)}
              sx={{
                width: "100%",
                margin: "1em 0",
                color: "white", // Maintain white text color
                "& .MuiOutlinedInput-root": {
                  // Target the root element for border styling
                  "& fieldset": {
                    // Target the fieldset element within root
                    borderColor: "white", // Set white border color
                    borderRadius: 5, // Add some rounded corners
                    borderWidth: 2, // Increase border width for emphasis (optional)
                  },
                  "&:hover fieldset": {
                    // Style on hover for a subtle depth effect
                    borderColor: "rgba(255, 255, 255, 0.7)", // Slightly lighter white on hover
                  },
                },
                "& .MuiInputLabel-root": {
                  // Hide the label (title)
                  display: "none",
                },
              }}
            />
          </Box>
        ) : position === "borrower" ? (
          <Box>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              Amount of ETH deposited:{" "}
              {typeof userInfo?.ethDeposited === "bigint"
                ? formatEther(userInfo.ethDeposited)
                : userInfo?.ethDeposited || "0"}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              Collateral Value: {formatEther(userInfo?.collateralValue || 0)}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              {userInfo?.depositTime &&
                `Deposit Time: ${giveTimestamp(userInfo.depositTime)}`}
            </Typography>
            <TextField
              id="outlined-number"
              type="number"
              onChange={(e) => setETHAmount(e.target.value)}
              sx={{
                width: "100%",
                margin: "1em 0",
                color: "white", // Maintain white text color
                "& .MuiOutlinedInput-root": {
                  // Target the root element for border styling
                  "& fieldset": {
                    // Target the fieldset element within root
                    borderColor: "white", // Set white border color
                    borderRadius: 5, // Add some rounded corners
                    borderWidth: 2, // Increase border width for emphasis (optional)
                  },
                  "&:hover fieldset": {
                    // Style on hover for a subtle depth effect
                    borderColor: "rgba(255, 255, 255, 0.7)", // Slightly lighter white on hover
                  },
                },
                "& .MuiInputLabel-root": {
                  // Hide the label (title)
                  display: "none",
                },
              }}
            />
          </Box>
        ) : (
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            No position found.
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {position === "lender" ? (
          <Button
            sx={{
              backgroundColor: "rgba(104, 110, 255, 1)", // Match background gradient's first color
              color: "white", // White text color for contrast
              fontWeight: "bold", // Bold text for emphasis
              padding: "10px 20px", // Adjust padding for desired button size
              borderRadius: 5, // Add some rounded corners
              border: "none", // Remove default border
              cursor: "pointer", // Set cursor to pointer on hover
              "&:hover": {
                // Style on hover for visual feedback
                backgroundColor: "rgba(141, 198, 255, 1)", // Match background gradient's second color for a subtle shift
              },
            }}
            size="small"
            onClick={handleDepositLPT}
          >
            Deposit LPT
          </Button>
        ) : position === "borrower" ? (
          <Button
            sx={{
              backgroundColor: "rgba(104, 110, 255, 1)", // Match background gradient's first color
              color: "white", // White text color for contrast
              fontWeight: "bold", // Bold text for emphasis
              padding: "10px 20px", // Adjust padding for desired button size
              borderRadius: 5, // Add some rounded corners
              border: "none", // Remove default border
              cursor: "pointer", // Set cursor to pointer on hover
              "&:hover": {
                // Style on hover for visual feedback
                backgroundColor: "rgba(141, 198, 255, 1)", // Match background gradient's second color for a subtle shift
              },
            }}
            size="small"
            onClick={callDepositETH}
          >
            Deposit ETH
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
