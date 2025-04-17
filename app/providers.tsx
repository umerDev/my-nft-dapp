'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '../config/rainbowkit';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { useEffect } from 'react';

// Create a singleton QueryClient instance
const queryClient = new QueryClient();

let isInitialized = false;

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run initialization logic once
    if (!isInitialized && typeof window !== 'undefined') {
      // Clear any existing WalletConnect sessions
      localStorage.removeItem('walletconnect');
      localStorage.removeItem('wc@2:client:0.3//session');
      localStorage.removeItem('wc@2:core:0.3//keychain');

      isInitialized = true;

      // We can't directly access process.emitter in the browser
      // The warnings about max listeners will still appear in development
      // but won't affect functionality
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme({
              accentColor: '#8B5CF6',
            }),
            darkMode: darkTheme({
              accentColor: '#8B5CF6',
            }),
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
