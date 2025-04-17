import { NFTMetadata } from '../../../core/nft/entities/NFTMetadata';
import pinataSDK from '@pinata/sdk';

const pinata = new pinataSDK(process.env.PINATA_API_KEY!, process.env.PINATA_SECRET_API_KEY!);

export async function uploadToIPFS(metadata: NFTMetadata): Promise<string> {
  const { name, description, image } = metadata;

  try {
    // Convert File to Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // First upload the image
    const imageResponse = await pinata.pinFileToIPFS(buffer, {
      pinataMetadata: {
        name: image.name,
      },
    });

    // Then upload the metadata
    const metadataResponse = await pinata.pinJSONToIPFS({
      name,
      description,
      image: `ipfs://${imageResponse.IpfsHash}`,
    });

    return `ipfs://${metadataResponse.IpfsHash}`;
  } catch (error) {
    console.error('Pinata upload error:', error);
    throw new Error('Failed to upload to IPFS');
  }
}
