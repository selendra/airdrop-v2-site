import { ethers } from "ethers";
import abi from '../constants/abi.json';

export async function Contract() {
  const contractAddress = '0xb0DB809A5e28be3981771B5bbD6066E7996845Ca';

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();
  let signer = provider.getSigner(accounts[0]);

  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  return Contract;
}