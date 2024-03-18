import { Address, createWalletClient, http } from "viem";
import { FUNDER_PRIVATE_KEY } from "../constants";
import { privateKeyToAccount } from "viem/accounts";
import { getPublicClient } from "./clients";

export type SendEthParams = {
  chainId: number;
  recipient: Address;
  amount: bigint; // in wei
};

export const sendEth = async (sendEth: SendEthParams) => {
  const recipient = sendEth.recipient;
  const amount = sendEth.amount;
  const publicClient = await getPublicClient(sendEth.chainId);
  const account = privateKeyToAccount(FUNDER_PRIVATE_KEY);
  const walletClient = createWalletClient({
    account,
    chain: publicClient.chain,
    transport: http(),
  });
  const hash = await walletClient.sendTransaction({
    account,
    to: recipient,
    value: amount,
  });
  // Send Eth
  const txReceipt = await publicClient.waitForTransactionReceipt({
    hash: hash,
  });
  console.log("txReceipt", txReceipt);
};
