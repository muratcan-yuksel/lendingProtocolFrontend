import { Box, Button } from "@mui/material";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";
const WalletComponent = () => {
  //hooks
  const { connect, status } = useConnect();
  console.log(status);
  const { disconnect } = useDisconnect();
  const account = useAccount();
  console.log(account.isConnected);

  const connectWallet = () => {
    connect({ connector: injected() });
  };

  return (
    <Box>
      {status === "success" || account.isConnected ? (
        <Box>
          <Box>Connected to {account.address}</Box>
          <Button onClick={() => disconnect()}>Disconnect</Button>{" "}
        </Box>
      ) : (
        <Button onClick={connectWallet}>Connect</Button>
      )}
    </Box>
  );
};

export default WalletComponent;
