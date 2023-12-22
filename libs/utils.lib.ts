import { ethers } from "ethers";

export function bigIntToString(int: bigint | number | string): string {
    return BigInt(int).toString();
  }
  
export function etherToWei(ether: string): string {
    return bigIntToString(ethers.utils.parseEther(ether).toString());
  }