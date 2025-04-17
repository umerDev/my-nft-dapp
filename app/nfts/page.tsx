'use client';
import React, { useEffect, useState } from 'react';
import NFTCard from '@/features/nft/components/NFTCard';

import { publicClient } from '@/lib/clients';
import { CONTRACT_ADDRESS } from '@/lib/contracts';
import MyNFT from '@/artifacts/contracts/MyNFT.sol/MyNFT.sol/MyNFT.json';
import { Hash } from 'viem';

async function fetchNFTs() {
  // Get tokenCounter (total minted, may include burned)
  const tokenCounter = (await publicClient.readContract({
    address: CONTRACT_ADDRESS as Hash,
    abi: MyNFT.abi,
    functionName: 'tokenCounter',
  })) as number;

  const nfts = [];
  for (let tokenId = 0; tokenId < tokenCounter; tokenId++) {
    try {
      // Get tokenURI
      const tokenURI = (await publicClient.readContract({
        address: CONTRACT_ADDRESS as Hash,
        abi: MyNFT.abi,
        functionName: 'tokenURI',
        args: [tokenId],
      })) as string;

      // Get owner
      const owner = (await publicClient.readContract({
        address: CONTRACT_ADDRESS as Hash,
        abi: MyNFT.abi,
        functionName: 'ownerOf',
        args: [tokenId],
      })) as string;

      // Fetch metadata from IPFS/HTTP
      let metadata = { name: '', description: '', image: '' };
      try {
        const url = tokenURI.startsWith('ipfs://')
          ? tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
          : tokenURI;
        const res = await fetch(url);
        metadata = await res.json();
      } catch (e) {
        // Ignore broken metadata
      }

      let imageUrl = metadata.image;
      if (imageUrl?.startsWith('ipfs://')) {
        imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
      }
      nfts.push({
        ...metadata,
        image: imageUrl,
        tokenId: tokenId.toString(),
        owner,
        openseaUrl: `https://testnets.opensea.io/assets/sepolia/${CONTRACT_ADDRESS}/${tokenId}`,
      });
    } catch (err) {
      // Skip burned or invalid tokens
      continue;
    }
  }
  return nfts;
}

const NFTGalleryPage: React.FC = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNFTs()
      .then((data) => {
        setNfts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch NFTs.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">NFT Gallery</h1>
      {loading ? (
        <div>Loading NFTs...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : nfts.length === 0 ? (
        <div>No NFTs found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nfts.map((nft, idx) => (
            <NFTCard key={idx} {...nft} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTGalleryPage;
