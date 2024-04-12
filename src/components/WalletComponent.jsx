import { Box, Button } from "@mui/material";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";
const WalletComponent = () => {
  //hooks
  const { connect, status } = useConnect();
  console.log(status);
  const { disconnect } = useDisconnect();
  const account = useAccount();

  const connectWallet = () => {
    connect({ connector: injected() });
  };
  const disconnectWallet = () => {
    () => disconnect();
  };

  return (
    <Box>
      {status === "success" ? (
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
