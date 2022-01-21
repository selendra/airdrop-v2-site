import { Dropdown, Button, Menu } from "antd";
import styled from "styled-components";

export const DropdownStyled = styled(Dropdown.Button)`
  width: 260px;
  height: 45px;
  button {
    color: #FFF;
    height: 45px;
    background: none;
    border-color: #03A9F4;
  }
  button:nth-child(1) {
    width: 260px;
    border-radius: 8px 0 0 8px!important;
    :hover, :focus {
      color: #FFF;
      background: #03A9F4;
      border: none;
    }
  }
  button:nth-child(2) {
    width: 60px;
    border-radius: 0 8px 8px 0!important;
    :hover, :focus {
      background: #03A9F4;
      border: none;
    }
  }
  @media screen and (max-width: 480px) {
    max-width: 180px;
  }
`
export const MenuStyled = styled(Menu)`
  background: #03A9F4;
`
export const Item = styled(Menu.Item)`
  width: 120px;
  color: #FFF!important;
  font-weight: 500;
  :hover {
    opacity: 0.8;
    background: #03A9F4;
  }
`