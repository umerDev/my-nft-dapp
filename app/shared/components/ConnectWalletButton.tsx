interface ConnectWalletButtonProps {
  onClick: () => void;
  connected: boolean;
  wallet: string | null;
}

export const ConnectWalletButton = ({ onClick, connected, wallet }: ConnectWalletButtonProps) => {
  return connected ? (
    <p>Connected to {wallet}</p>
  ) : (
    <button onClick={onClick}>Connect Wallet</button>
  );
};
