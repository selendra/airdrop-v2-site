import { useContext } from "react";
import { Context } from "../../context/context";
import { ButtonConnect } from "./styles";

export default function BtnConnect() {
  const {account, connectWallet} = useContext(Context)
  return (
    <ButtonConnect onClick={connectWallet}>
      {account ? `0x...${account.slice(-5)}` : 'Connect Wallet'}
    </ButtonConnect>
  )
}