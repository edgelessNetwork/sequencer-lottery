import { CHAIN_ID, WINNING_AMOUNT, timeInterval } from "./constants";
import { sendEth } from "./blockchain/sendEth";
import dotenv from "dotenv";
import { getPublicClient } from "./blockchain/clients";
import { getWinningAddress } from "./blockchain/getWinningAddress";
dotenv.config();

const monitor = async () => {
  while (true) {
    await spinLottery();
    await delay(timeInterval);
  }
};

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const spinLottery = async () => {
  const fromBlock = 0;
  const publicClient = await getPublicClient(CHAIN_ID);
  const toBlock = Number((await publicClient.getBlock()).number);
  const winningAddress = await getWinningAddress(CHAIN_ID, fromBlock, toBlock);
  await sendEth({
    chainId: CHAIN_ID,
    recipient: winningAddress,
    amount: WINNING_AMOUNT,
  });
};

monitor();
