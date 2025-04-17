import { NFTMetadata } from '@/core/nft/entities/NFTMetadata';
import { NFTRepository } from '@/core/nft/ports/NFTRepository';
import { walletClient } from '@/lib/clients';
import { getNFTContract } from '@/lib/contracts';
import { waitForTransactionReceipt } from 'viem/actions';
import { uploadToIPFS } from '../infra/nftStorage';

export const nftRepository: NFTRepository = {
  async uploadToIPFS(metadata: NFTMetadata) {
    try {
      return await uploadToIPFS(metadata);
    } catch (error) {
      console.error('Failed to upload to IPFS:', error);
      throw new Error('Failed to upload metadata to IPFS');
    }
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
