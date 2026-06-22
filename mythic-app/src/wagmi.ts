import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bsc, bscTestnet } from "wagmi/chains";

// Get a free WalletConnect Project ID at https://cloud.reown.com
// and place it in mythic-app/.env as VITE_WC_PROJECT_ID=xxxxx
const envId = import.meta.env.VITE_WC_PROJECT_ID?.trim();
const projectId = envId && envId.length > 0 ? envId : "DEMO_PROJECT_ID";

export const config = getDefaultConfig({
  appName: "MYTHIC — Civilization Protocol",
  projectId,
  chains: [bsc, bscTestnet],
  ssr: false,
});
