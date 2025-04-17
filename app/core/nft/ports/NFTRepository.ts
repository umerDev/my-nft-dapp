import { NFTMetadata } from '../entities/NFTMetadata';

export interface NFTRepository {
  uploadToIPFS(metadata: NFTMetadata): Promise<string>;
  mint(to: string, tokenURI: string): Promise<void>;
}
