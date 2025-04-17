import { NFTRepository } from '@/core/nft/ports/NFTRepository';
import { NFTMetadata } from '@/core/nft/entities/NFTMetadata';
import pinataSDK from '@pinata/sdk';
import { writeFile, unlink } from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

// Initialize Pinata client
const pinata = new pinataSDK(process.env.PINATA_API_KEY!, process.env.PINATA_SECRET_API_KEY!);

/**
 * Server-side implementation of the NFTRepository
 * This handles IPFS uploads but delegates actual minting to the client
 */
export const serverNftRepository: NFTRepository = {
  async uploadToIPFS(metadata: NFTMetadata): Promise<string> {
    try {
      // Convert the File to a Buffer for Pinata
      const file = metadata.image;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Save buffer to temporary file
      const tempFileName = `upload-${crypto.randomUUID()}`;
      const tempFilePath = path.join(os.tmpdir(), tempFileName);
      await writeFile(tempFilePath, buffer);

      // Create a file stream for Pinata
      const fileStream = createReadStream(tempFilePath);

      // Upload the image to IPFS
      const imageResponse = await pinata.pinFileToIPFS(fileStream, {
        pinataMetadata: {
          name: file.name,
        },
      });

      // Clean up temp file
      await unlink(tempFilePath);

      // Create the metadata JSON
      const nftMetadata = {
        name: metadata.name,
        description: metadata.description,
        image: `ipfs://${imageResponse.IpfsHash}`,
      };

      // Upload the metadata to IPFS
      const metadataResponse = await pinata.pinJSONToIPFS(nftMetadata);
      
      // Return the token URI
      return `ipfs://${metadataResponse.IpfsHash}`;
    } catch (error) {
      console.error('Failed to upload to IPFS:', error);
      throw new Error('Failed to upload to IPFS');
    }
  },

  async mint(to: string, tokenURI: string): Promise<void> {
    // Server-side minting is not implemented
    // This would require a private key which is not secure to store on the server
    // Instead, we'll return the tokenURI and let the client handle the minting
    console.log(`Server would mint NFT to ${to} with URI ${tokenURI}`);
    throw new Error('Server-side minting is not implemented. Use client-side minting instead.');
  }
};
