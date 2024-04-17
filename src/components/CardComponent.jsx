/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatEther, parseUnits } from "viem";
import { useWriteContract } from "wagmi";
import {
  lendingProtocolAbi,
  protocol_contract_address,
} from "../ABI/lendingProtocolAbi";
import { tokenAbi, token_contract_address } from "../ABI/tokenAbi";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function CardComponent({ userInfo, position }) {
  console.log(userInfo);
  // console.log(userInfo.depositTime);
  // console.log("collateral value" + typeof userInfo.collateralValue);
  // console.log(userInfo.collateralValue);
  // console.log("eth deposited" + typeof userInfo.ethDeposited);
  // console.log(userInfo.ethDeposited);
  //state
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

  //merge above functions together

  const handleDepositLPT = async () => {
    try {
      await handleApprove();
      await callDepositLPT();
    } catch (error) {
      console.log(error);
    }
  };

  const giveTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {position === "lender" ? (
          <Box>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Amount of LPT lent to the protocol:{" "}
              {formatEther(userInfo.amountLent)}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Interest Earned: {formatEther(userInfo.interestEarned)}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {userInfo.depositTime &&
                `Deposit Time: ${giveTimestamp(userInfo.depositTime)}`}
            </Typography>
            <TextField
              id="ohandleDepositLPTutlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setLPTAmount(e.target.value)}
            />
          </Box>
        ) : position === "borrower" ? (
          <Box>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {/* great line. because ethDeposited returns undefined */}
              Amount of ETH deposited:{" "}
              {typeof userInfo.ethDeposited === "bigint"
                ? formatEther(userInfo.ethDeposited)
                : userInfo.ethDeposited || "0"}{" "}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Collateral Value: {formatEther(userInfo.collateralValue)}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {userInfo.depositTime &&
                `Deposit Time: ${giveTimestamp(userInfo.depositTime)}`}
            </Typography>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        ) : (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            No position found.
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {position === "lender" ? (
          <Button size="small" onClick={handleDepositLPT}>
            Deposit LPT
          </Button>
        ) : position === "borrower" ? (
          <Button size="small">Deposit ETH</Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
