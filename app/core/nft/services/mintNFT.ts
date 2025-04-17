import { NFTMetadata } from '../entities/NFTMetadata';
import { IPFSRepository, MintRepository } from '../ports/NFTRepository';

export async function mintNFT(
  userAddress: string,
  metadata: NFTMetadata,
  ipfsRepository: IPFSRepository,
  mintRepository: MintRepository
) {
  const tokenURI = await ipfsRepository.uploadToIPFS(metadata);
  await mintRepository.mint(userAddress, tokenURI);
}
