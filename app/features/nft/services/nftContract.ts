import { ethers } from 'ethers';
import MyNFT from '../../../artifacts/contracts/MyNFT.sol/MyNFT.sol/MyNFT.json';

const contract_address = process.env.CONTRACT_ADDRESS!;

export const getNFTContract = (signerOrProvider: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(contract_address, MyNFT.abi, signerOrProvider);
};

export const getNFTContractWithSigner = (signer: ethers.Signer) => {
  return getNFTContract(signer);
};
