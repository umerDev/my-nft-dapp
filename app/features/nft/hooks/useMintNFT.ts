import { useAccount } from 'wagmi';
import { mintNFT } from '@/core/nft/services/mintNFT';
import { nftRepository } from '@/adapters/nft/web3/nftContract';
import { NFTMetadata } from '@/core/nft/entities/NFTMetadata';
import { useState } from 'react';

export function useMintNFT() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const handleMint = async (metadata: NFTMetadata) => {
    if (!address) return;
    setLoading(true);
    try {
      await mintNFT(address, metadata, nftRepository);
      alert('NFT minted!');
    } catch (err) {
      console.error(err);
      alert('Minting failed.');
    } finally {
      setLoading(false);
    }
  };

  return { handleMint, loading };
}
