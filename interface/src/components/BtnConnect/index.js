import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
import { DropdownStyled, MenuStyled, Item } from "./styles";

export default function BtnConnect() {
  const {account, connectWallet} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    connectWallet();
  },[]);

  function handleLogout() {
    localStorage.setItem('token', '');
    navigate('/login');
  }

  const menu = (
    <MenuStyled>
      <Item onClick={handleLogout} key="1">
        Logout
      </Item>
    </MenuStyled>
  );

  return (
    <DropdownStyled overlay={menu} onClick={connectWallet}>
      {account ? `0x...${account.slice(-6)}` : 'Connect Wallet'}
    </DropdownStyled>
  )
}