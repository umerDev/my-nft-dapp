# My NFT DApp

A Next.js-based NFT minting application that allows users to connect their wallets and mint NFTs on the Sepolia testnet.

## Project Architecture

The project follows a clean architecture pattern with the following structure:

```
app/
├── adapters/         # External service adapters (web3, storage)
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

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS
- **Web3**: Viem, Wagmi, RainbowKit
- **Blockchain**: Sepolia Testnet
- **Storage**: NFT.Storage (IPFS)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_id
NEXT_PUBLIC_NFT_STORAGE_KEY=your_nft_storage_key
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Wallet connection using RainbowKit
- NFT minting on Sepolia testnet
- IPFS metadata storage
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
