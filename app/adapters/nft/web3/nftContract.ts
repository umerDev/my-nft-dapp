import { NFTMetadata } from '@/core/nft/entities/NFTMetadata';
import { NFTRepository } from '@/core/nft/ports/NFTRepository';
import { walletClient } from '@/lib/clients';
import { getNFTContract } from '@/lib/contracts';
import { waitForTransactionReceipt } from 'viem/actions';

export const nftRepository: NFTRepository = {
  async uploadToIPFS(metadata: NFTMetadata): Promise<string> {
    // This is a client-side implementation, so we can't actually upload to IPFS here
    // Instead, we'll throw an error suggesting to use the server-side implementation
    throw new Error('Client-side IPFS upload is not supported. Use the server-side API instead.');
  },

  async mint(to: string, tokenURI: string) {
    try {
      const contract = await getNFTContract();
      const hash = await contract.write.mintNFT([to, tokenURI]);
      await waitForTransactionReceipt(walletClient, { hash });
    } catch (error) {
      console.error('Failed to mint NFT:', error);
      throw new Error('Failed to mint NFT');
    }
  },
};
