import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bsc, bscTestnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "NEXUS Protocol",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "demo",
  chains: [bsc, bscTestnet],
  ssr: false,
});
