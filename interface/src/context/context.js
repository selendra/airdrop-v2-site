import { createContext, useState } from "react";
import { message } from "antd";
import { ErrorHandling } from "../utils/errorHandling";

export const Context = createContext();
export const ContextProvider = ({children}) => {
  const [account, setAccount] = useState('');

  async function switchEthereumChain() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWallet() {
    if(window.ethereum) {
      try {
        switchEthereumChain();
        await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccount(accounts[0]);
        });
      } catch (error) {
        ErrorHandling(error);
      }
    } else {
      message.error('Metamask not Detected!')
    }
  }
  return (
    <Context.Provider
      value={{
        account,
        connectWallet
      }}
    >{children}</Context.Provider>
  )
}