import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../config.js";
import { Box } from "@mui/material";
import "./index.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Box
          sx={{
            background:
              "linear-gradient(90deg, rgba(104, 110, 255, 1) 0%, rgba(141, 198, 255, 1) 100%)",
            height: "100vh",
            width: "100vw",
          }}
        >
          <App />
        </Box>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
