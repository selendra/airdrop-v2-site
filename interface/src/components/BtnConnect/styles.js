import { Dropdown, Button, Menu } from "antd";
import styled from "styled-components";

export const ButtonConnect = styled(Button)`
  background: none;
  color: #FFF;
  border: 1px solid #F49D09;
  font-weight: 500;
  :hover, :focus {
    border: 1px solid #F49D09;
    background: #F49D09;
    color: #FFF;
  }
`
export const DropdownStyled = styled(Dropdown)`
  width: 280px;
  height: 45px;
  border-radius: 8px;
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