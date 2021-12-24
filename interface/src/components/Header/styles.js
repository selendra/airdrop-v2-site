import styled from "styled-components";
import { GlobalContainer } from "../../styles/GlobalStyles";

export const Wrapper = styled.div`
  height: 105px;
  border-bottom: 1px solid #283565;
  ${GlobalContainer} {
    display: flex;
    align-items: center;
    justify-content: ${props => props.auth ? 'space-between' : 'center'};
  }
`