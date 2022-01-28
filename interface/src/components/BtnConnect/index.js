// import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Context } from "../../context/context";
import { Logout, MenuStyled, Item } from "./styles";
import { LogoutOutlined } from '@ant-design/icons';

export default function BtnConnect() {
  // const {account, connectWallet} = useContext(Context);
  const navigate = useNavigate();

  // useEffect(() => {
  //   connectWallet();
  // },[connectWallet]);

  function handleLogout() {
    localStorage.setItem('token', '');
    navigate('/login');
  }

  // const menu = (
  //   <MenuStyled>
  //     <Item onClick={handleLogout} key="1">
  //       Logout
  //     </Item>
  //   </MenuStyled>
  // );

  return (
    // <DropdownStyled overlay={menu} onClick={connectWallet}>
    //   {account ? `0x...${account.slice(-6)}` : 'Connect Wallet'}
    // </DropdownStyled>
    <Logout onClick={handleLogout}>Logout <LogoutOutlined/></Logout>
  )
}