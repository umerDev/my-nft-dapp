import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { address, tokenURI } = await request.json();

    if (!address || !tokenURI) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the contract address from environment variables
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    
    if (!CONTRACT_ADDRESS) {
      return NextResponse.json({ error: 'Contract address not configured in environment variables' }, { status: 500 });
    }
    
    // Since we can't sign transactions on the server (no private keys),
    // we'll return the necessary information for the client to complete the transaction
    const contractInfo = {
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
      address: CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'mintNFT',
      args: [address as `0x${string}`, `ipfs://${tokenURI}`],
    };

    return NextResponse.json({
      success: true,
      contractInfo,
    });
  } catch (error: any) {
    console.error('Failed to mint NFT:', error);
    return NextResponse.json({ 
      error: 'Failed to mint NFT',
      details: error.message 
    }, { status: 500 });
  }
}
