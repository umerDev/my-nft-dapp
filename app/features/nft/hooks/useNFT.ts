import { useState } from 'react';
import { getNFTContract } from '@lib/contracts';
import { walletClient } from '@lib/clients';
import { waitForTransactionReceipt } from 'viem/actions';

export const useNFT = (wallet?: string | null) => {
  const [minting, setMinting] = useState(false);

  const mintNFT = async () => {
    if (!wallet) return;
    try {
      setMinting(true);
      const contract = await getNFTContract();
      const hash = await contract.write.mintNFT([wallet, 'ipfs://Qm...']); // Replace with your actual token URI
      await waitForTransactionReceipt(walletClient, { hash });
      setMinting(false);
    } catch (error) {
      console.error(error);
      setMinting(false);
    } finally {
      setMinting(false);
    }
  };

  return { mintNFT, minting };
};
