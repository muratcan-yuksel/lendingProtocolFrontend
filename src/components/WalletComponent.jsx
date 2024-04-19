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
          <Box
            sx={{
              margin: "10px",
              fontSize: "15px",
            }}
          >
            Connected to {account.address}
          </Box>
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
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>{" "}
        </Box>
      ) : (
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
          onClick={connectWallet}
        >
          Connect
        </Button>
      )}
    </Box>
  );
};

export default WalletComponent;
