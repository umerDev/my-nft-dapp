import { NFTRepository } from '@/app/core/nft/ports/NFTRepository';
import { uploadToIPFS } from '../infra/nftStorage';
import { NFTMetadata } from '@/app/core/nft/entities/NFTMetadata';
import { walletClient } from '@/app/lib/clients';
import { getNFTContract } from '@/app/lib/contracts';
import { waitForTransactionReceipt } from 'viem/actions';

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
