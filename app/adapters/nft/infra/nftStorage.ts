import { NFTStorage } from 'nft.storage';
import { NFTMetadata } from '../../../core/nft/entities/NFTMetadata';

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY!,
});

export async function uploadToIPFS(metadata: NFTMetadata): Promise<string> {
  const { name, description, image } = metadata;

  const cid = await client.store({
    name,
    description,
    image: new File([image], image.name, { type: image.type }),
  });

  return `ipfs://${cid}/metadata.json`;
}
