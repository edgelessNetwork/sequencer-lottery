import type { Chain } from "viem";
import { createPublicClient, http } from "viem";
import { optimism, sepolia } from "viem/chains";

import { defineChain } from "viem";

export const getPublicClient = (chainId: number) => {
  let chain: Chain;
  if (chainId === 202) {
    chain = edgelessTestnet;
  } else if (chainId === 11155111) {
    chain = sepolia;
  } else {
    chain = optimism;
  }
  const client = createPublicClient({
    chain,
    transport: http(),
  });
  return client;
};

export const edgelessTestnet: Chain = defineChain({
  id: 202, // Replace this with your chain's ID
  name: "Edgeless Testnet",
  network: "edgeless-testnet",
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: "Edgeless Wrapped Eth",
    symbol: "EwEth",
  },
  rpcUrls: {
    default: {
      http: ["https://edgeless-testnet.rpc.caldera.xyz/http"],
      webSocket: ["wss://edgeless-testnet.rpc.caldera.xyz/ws"],
    },
    public: {
      http: ["https://edgeless-testnet.rpc.caldera.xyz/http"],
      webSocket: ["wss://edgeless-testnet.rpc.caldera.xyz/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://edgeless-testnet.explorer.caldera.xyz/",
    },
  },
});
