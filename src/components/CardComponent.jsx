/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatEther } from "viem";

export default function CardComponent({ userInfo }) {
  console.log(userInfo);
  console.log(userInfo.depositTime);
  console.log(userInfo.depositTime);

  const giveTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {userInfo && (
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
              Interst Earned: {formatEther(userInfo.interestEarned)}
            </Typography>{" "}
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {userInfo.depositTime &&
                `Deposit Time: ${giveTimestamp(userInfo.depositTime)}`}{" "}
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
