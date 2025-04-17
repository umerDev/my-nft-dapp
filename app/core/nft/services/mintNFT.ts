import { NFTMetadata } from '../entities/NFTMetadata';
import { NFTRepository } from '../ports/NFTRepository';

export async function mintNFT(userAddress: string, metadata: NFTMetadata, repo: NFTRepository) {
  const tokenURI = await repo.uploadToIPFS(metadata);
  await repo.mint(userAddress, tokenURI);
}
