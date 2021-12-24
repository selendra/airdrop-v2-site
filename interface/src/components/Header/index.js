import { GlobalContainer } from "../../styles/GlobalStyles";
import { Wrapper } from "./styles";
import logo from '../../assets/logo.png';
import BtnConnect from "../BtnConnect";

export default function Header({auth}) {
  return (
    <Wrapper auth={auth}>
      <GlobalContainer>
        <img src={logo} alt='' width={120} height={50} />
        {auth && <BtnConnect />}
      </GlobalContainer>
    </Wrapper>
  )
}
