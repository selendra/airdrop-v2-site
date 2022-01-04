import { Dropdown, Button, Menu } from "antd";
import styled from "styled-components";

export const DropdownStyled = styled(Dropdown.Button)`
  width: 200px;
  height: 45px;
  button {
    color: #FFF;
    height: 45px;
    background: none;
    border-color: #F49D09;
  }
  button:nth-child(1) {
    border-radius: 8px 0 0 8px!important;
    width: 180px;
    :hover {
      color: #FFF;
      background: #F49D09;
      border: none;
    }
  }
  button:nth-child(2) {
    border-radius: 0 8px 8px 0!important;
    :hover {
      background: #F49D09;
      border: none;
    }
  }
  @media screen and (max-width: 480px) {
    max-width: 120px;
  }
`
export const MenuStyled = styled(Menu)`
  background: #F49D09;
`
export const Item = styled(Menu.Item)`
  color: #FFF!important;
  font-weight: 500;
  :hover {
    background: #cc8102;
  }
`