import dotenv from "dotenv";
import { Hex, parseEther } from "viem";
// Ensure that you set these environment variables in your deployment environment
dotenv.config();

const processPrivateKeys = (privateKey: string): Hex => {
  const key = privateKey as Hex;
  if (!verifyPrivateKey(key)) {
    throw new Error(
      "Invalid private key, needs to start with 0x and have 66 characters"
    );
  }
  return key;
};

const verifyPrivateKey = (privateKey: string) => {
  if (privateKey.substring(0, 2) !== "0x") {
    return false;
  }
  if (privateKey.length !== 66) {
    return false;
  }
  return true;
};

if (!process.env.FUNDER_PRIVATE_KEY) {
  throw new Error("FUNDER_PRIVATE_KEY environment variable not set");
}
export const FUNDER_PRIVATE_KEY = processPrivateKeys(
  process.env.FUNDER_PRIVATE_KEY
);
export const CHAIN_ID = 202;
if (!process.env.WINNING_AMOUNT) {
  throw new Error("WINNING_AMOUNT environment variable not set");
}
export const WINNING_AMOUNT = parseEther(process.env.WINNING_AMOUNT);
if (!process.env.TIME_INTERVAL) {
  throw new Error("TIME_INTERVAL environment variable not set");
}
export const timeInterval = process.env.TIME_INTERVAL;
