import { NextResponse } from 'next/server';
import { serverNftRepository } from '@/adapters/nft/server/serverNftRepository';
import { NFTMetadata } from '@/core/nft/entities/NFTMetadata';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const address = formData.get('address') as string;

    if (!file || !name || !description || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the contract address from environment variables
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    
    if (!CONTRACT_ADDRESS) {
      return NextResponse.json({ error: 'Contract address not configured in environment variables' }, { status: 500 });
    }
    
    try {
      // Create the metadata object that follows the NFTMetadata type
      const metadata = {
        name,
        description,
        image: file, // Pass the file object directly
      };

      // Use the mintNFT service with the server repository for IPFS upload
      // Note: The server repository can only handle IPFS uploads, not actual minting
      // The client will need to handle the actual blockchain transaction
      const tokenURI = await serverNftRepository.uploadToIPFS(metadata);
      
      // Return the tokenURI for the client to use for minting
      
      // Since we're using the mintNFT service, we don't have direct access to the IPFS hashes
      // We could modify the service to return these values if needed
      // For now, we'll just return a success message
      
      return NextResponse.json({
        success: true,
        message: 'NFT metadata uploaded to IPFS successfully',
        address,
        tokenURI
      });
    } catch (error: any) {
      console.error('Error minting NFT:', error);
      return NextResponse.json({ 
        error: 'Failed to mint NFT', 
        details: error.message 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Failed to mint NFT:', error);
    return NextResponse.json({ 
      error: 'Failed to mint NFT',
      details: error.message 
    }, { status: 500 });
  }
}
