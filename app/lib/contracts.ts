import { getContract, Hash } from 'viem';
import { walletClient } from './clients';
import MyNFT from '@/artifacts/contracts/MyNFT.sol/MyNFT.json';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Hash;

export const getNFTContract = (client: any | undefined) => {
  return getContract({
    abi: MyNFT.abi,
    address: CONTRACT_ADDRESS as Hash,
    client: client ?? walletClient,
  });
};
