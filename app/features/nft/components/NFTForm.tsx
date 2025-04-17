'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { nftRepository } from '@/adapters/nft/web3/nftContract';

export const NFTForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { address } = useAccount();

  // Validate form inputs
  const validateForm = (): boolean => {
    if (!address) {
      setError('Please connect your wallet first');
      return false;
    }

    if (!file || !name || !description) {
      setError('Please fill in all fields');
      return false;
    }

    return true;
  };

  // Upload file to IPFS
  const uploadToIPFS = async (
    file: File,
    name: string,
    description: string
  ): Promise<{ ipfsHash: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);

    const response = await fetch('/api/nft-storage', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to store NFT');
    }

    const data = await response.json();
    console.log('api response ', data);
    return { ipfsHash: data.metadata.IpfsHash };
  };

  // Main form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { ipfsHash } = await uploadToIPFS(file!, name, description);

      if (!address) {
        throw new Error('Wallet address not available');
      }

      const tokenURI = `ipfs://${ipfsHash}`;

      await nftRepository.mint(address, tokenURI);

      setSuccess(`NFT minted successfully with IPFS hash: ${ipfsHash}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter NFT name"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter NFT description"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          File
        </label>
        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Storing...' : 'Store NFT'}
      </button>
      {error && <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</div>}
      {success && (
        <div className="rounded-md bg-green-100 p-3 text-sm text-green-700">{success}</div>
      )}
    </form>
  );
};
