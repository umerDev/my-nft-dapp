import React from 'react';

interface NFTCardProps {
  name: string;
  description: string;
  image: string;
  tokenId?: string | number;
  owner?: string;
  openseaUrl?: string;
}

const NFTCard: React.FC<NFTCardProps> = ({
  name,
  description,
  image,
  tokenId,
  owner,
  openseaUrl,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md p-4 flex flex-col items-center space-y-3 w-full max-w-xs">
      <img
        src={image}
        alt={name}
        className="rounded-md object-cover w-full h-64 border border-gray-100"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold text-gray-900 truncate w-full">{name}</h3>
      <p className="text-sm text-gray-600 w-full truncate">{description}</p>
      {tokenId && <div className="text-xs text-gray-400">Token ID: {tokenId}</div>}
      {owner && (
        <div className="text-xs text-gray-400 truncate">
          Owner:{owner.slice(0, 6)}...{owner.slice(owner.length - 4)}
        </div>
      )}
      {openseaUrl && (
        <a
          href={openseaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-xs"
        >
          View on OpenSea
        </a>
      )}
    </div>
  );
};

export default NFTCard;
