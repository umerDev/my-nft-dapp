import { MintRepository } from '@/core/nft/ports/NFTRepository';
import { walletClient } from '@/lib/clients';
import { getNFTContract } from '@/lib/contracts';
import { waitForTransactionReceipt } from 'viem/actions';

/**
 * Client-side implementation of the MintRepository
 * This handles blockchain minting operations only
 */
export const mintRepository: MintRepository = {
  async mint(to: string, tokenURI: string) {
    try {
      const contract = await getNFTContract();
      const hash = await contract.write.mintNFT([to, tokenURI], { account: to });
      const receipt = await waitForTransactionReceipt(walletClient, { hash });
      return receipt.transactionHash;
    } catch (error) {
      console.error('Failed to mint NFT:', error);
      throw new Error('Failed to mint NFT');
    }
  },
};
