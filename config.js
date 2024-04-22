import { http, createConfig } from "wagmi";
import { mainnet, sepolia, localhost, hardhat } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia, localhost, hardhat],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
    [localhost.id]: http(),
  },
});
