import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const connectWallet = async (): Promise<{
  wallet: string | null;
  provider: ethers.BrowserProvider;
}> => {
  if (!window.ethereum) {
    throw new Error('Ethereum provider not found');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);

  return {
    wallet: accounts[0],
    provider,
  };
};

export {};
