'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NFTForm } from '@/features/nft/components/NFTForm';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">My NFT Dapp</h1>
        <div className="w-full max-w-md">
          <ConnectButton />
        </div>
        <div className="w-full max-w-2xl">
          <NFTForm />
        </div>
      </div>
    </main>
  );
}
