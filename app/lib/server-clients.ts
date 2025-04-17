import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

// Create a public client for read operations
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// For server-side operations, we only need the public client
// Actual minting will be done client-side
