'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useState } from 'react';

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [showOptions, setShowOptions] = useState(false);

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const handleDisconnect = () => {
    disconnect();
    setShowOptions(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="relative">
      {!isConnected ? (
        <button
          onClick={handleConnect}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
        >
          <div className="relative rounded-xl bg-white px-6 py-3 transition-all duration-300 group-hover:bg-opacity-0">
            <span className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-sm font-medium text-transparent group-hover:text-white">
              Connect Wallet
            </span>
          </div>
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="group flex items-center space-x-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-purple-200 hover:shadow-md"
          >
            <div className="flex h-2 w-2 items-center justify-center">
              <div className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500 opacity-75" />
              <div className="absolute h-2 w-2 rounded-full bg-green-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">{formatAddress(address!)}</span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                showOptions ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200">
              <button
                onClick={handleDisconnect}
                className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50"
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Disconnect</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
