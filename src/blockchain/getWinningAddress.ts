import { BlacklistedAddresses } from "../constants";
import { getPublicClient } from "./clients";

/**
 * @dev Get a random address that sent a transaction between two blocks
 * @param {number} fromBlock
 * @param {number} toBlock
 */
export const getWinningAddress = async (
  chainId: number,
  fromBlock: number,
  toBlock: number
) => {
  const publicClient = await getPublicClient(chainId);
  const randomBlock = BigInt(
    Math.floor(Math.random() * (toBlock - fromBlock) + fromBlock)
  );
  const block = await publicClient.getBlock({ blockNumber: randomBlock });
  const transactions = block.transactions;
  const randomTransactionHash =
    transactions[Math.floor(Math.random() * transactions.length)];
  const transaction = await publicClient.getTransaction({
    hash: randomTransactionHash,
  });
  if (BlacklistedAddresses.has(transaction.from)) {
    return getWinningAddress(chainId, fromBlock, toBlock);
  } else {
    return transaction.from;
  }
};
