'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { mintRepository } from '@/adapters/nft/web3/nftContract';

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

  // Upload to IPFS and get tokenURI
  const uploadToIPFS = async (
    file: File,
    name: string,
    description: string,
    walletAddress: string
  ): Promise<{ success: boolean, message: string, tokenURI: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', walletAddress);

    const response = await fetch('/api/mint-nft', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload to IPFS');
    }

    return await response.json();
  };
  
  // Contract interaction for minting
  const { writeContract, data: mintTxHash, isPending: isMinting, isSuccess: isMintSuccess, error: mintError } = useWriteContract();
  
  // Wait for transaction
  const { isLoading: isWaiting, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: mintTxHash,
  });
  
  // Handle successful transaction confirmation
  if (isConfirmed) {
    // Only run this once when confirmation changes to true
    if (!success || !success.includes('confirmed')) {
      setSuccess('NFT minted successfully! Transaction confirmed on the blockchain.');
      setIsLoading(false);
    }
  }

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
      if (!address) {
        throw new Error('Wallet address not available');
      }

      // Step 1: Upload to IPFS and get tokenURI
      const result = await uploadToIPFS(file!, name, description, address);
      
      // Step 2: Mint the NFT on the blockchain using the tokenURI
      // We can either use the mintRepository directly or use the Wagmi hooks
      // Using Wagmi hooks gives us better UI feedback and transaction handling
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: [
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'string', name: 'uri', type: 'string' },
            ],
            name: 'mintNFT',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'mintNFT',
        args: [address as `0x${string}`, result.tokenURI],
      });
      
      // Alternative approach using the repository directly:
      // try {
      //   await mintRepository.mint(address, result.tokenURI);
      // } catch (error) {
      //   console.error('Error minting:', error);
      //   throw error;
      // }
      
      setSuccess(`Metadata uploaded to IPFS. Minting transaction initiated...`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
      <button type="submit" disabled={isLoading || isMinting || isWaiting} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400">
        {isLoading ? 'Uploading to IPFS...' : 
         isMinting ? 'Initiating transaction...' : 
         isWaiting ? 'Confirming transaction...' : 
         'Mint NFT'}
      </button>
      {error && <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</div>}
      {success && (
        <div className="rounded-md bg-green-100 p-3 text-sm text-green-700">{success}</div>
      )}
    </form>
  );
};
