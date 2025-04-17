import { NFTMetadata } from '../entities/NFTMetadata';

/**
 * Interface for IPFS storage operations (server-side)
 */
export interface IPFSRepository {
  uploadToIPFS(metadata: NFTMetadata): Promise<string>;
}

/**
 * Interface for blockchain minting operations (client-side)
 */
export interface MintRepository {
  mint(to: string, tokenURI: string): Promise<string>;
}

/**
 * Combined interface for backward compatibility
 * @deprecated Use IPFSRepository and MintRepository instead
 */
export interface NFTRepository extends IPFSRepository, MintRepository {}
