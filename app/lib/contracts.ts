import { getContract } from 'viem';
import { walletClient } from './clients';
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.sol/MyNFT.json';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export const getNFTContract = async () => {
  return getContract({
    abi: MyNFT.abi,
    address: CONTRACT_ADDRESS as `0x${string}`,
    client: walletClient,
  });
};
