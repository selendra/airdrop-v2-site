import { createContext, useState } from "react";
import { message } from "antd";

export const Context = createContext();
export const ContextProvider = ({children}) => {
  const [account, setAccount] = useState('');

  async function connectWallet() {
    if(window.ethereum) {
      try {
        await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccount(accounts[0]);
        });
      } catch (error) {
        // ErrorHandling(error);
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