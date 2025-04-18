# My NFT DApp

A Next.js-based NFT minting application that allows users to connect their wallets and mint NFTs on the Sepolia testnet.

## Smart Contract Reference

This dapp uses a custom ERC-721 contract for minting NFTs. You can view the contract source code here:

- [umerDev/erc721-nft-contract](https://github.com/umerDev/erc721-nft-contract)

## Project Architecture

The project follows a clean architecture pattern with the following structure:

```
app/
├── adapters/        # External service adapters (web3, storage)
├── core/            # Core business logic and entities
├── features/        # Feature modules (NFT minting, etc.)
├── lib/             # Shared libraries and utilities
├── shared/          # Shared components and utilities
└── page.tsx         # Main application page
```

### Key Components

- **Adapters**: Handle external services like web3 and IPFS storage
- **Core**: Contains business logic and domain entities
- **Features**: Feature-specific components and hooks
- **Lib**: Shared libraries and configurations
- **Shared**: Reusable components and utilities

## NFT Minting Flow

- User uploads an image and metadata via the dapp UI.
- The image and metadata are uploaded to IPFS via a server API route using Pinata.
- Once IPFS upload is complete, the dapp mints the NFT **client-side** using the connected wallet (RainbowKit/Wagmi/Viem), directly from the browser.
- The transaction is signed and sent by the user's wallet; the backend never handles private keys or executes blockchain transactions.

## NFT Gallery (/nfts)

- The `/nfts` route displays all NFTs minted by the contract.
- The gallery fetches token metadata and images from IPFS, and displays token ID, owner, and a link to OpenSea.
- Works with contracts that do **not** implement ERC721Enumerable: it uses the `tokenCounter` pattern and gracefully skips burned tokens.
- Images are auto-converted from `ipfs://` to `https://ipfs.io/ipfs/` for display.

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS
- **Web3**: Viem, Wagmi, RainbowKit
- **Blockchain**: Sepolia Testnet
- **Storage**: Pinata (IPFS)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_id
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_api_key
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **View the NFT Gallery:**
   - Navigate to [http://localhost:3000/nfts](http://localhost:3000/nfts) to see all NFTs minted by the contract, including their images, metadata, owner, and a link to view each NFT on OpenSea.

## Features

- Wallet connection using RainbowKit
- NFT minting on Sepolia testnet (client-side, with user wallet)
- IPFS metadata storage using Pinata (via server API)
- **NFT Gallery page** to view all minted NFTs (`/nfts`)
- Responsive UI with Tailwind CSS

## Development

The project uses TypeScript with strict type checking and follows a clean architecture pattern. Key development practices:

- Use path aliases for imports (e.g., `@features/*`, `@shared/*`)
- Follow the feature-based folder structure
- Implement proper error handling
- Use TypeScript for type safety

## Deployment

The application can be deployed on Vercel:

```bash
npm run build
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Viem Documentation](https://viem.sh)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://www.rainbowkit.com)
