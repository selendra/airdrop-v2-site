import { message } from 'antd';
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "../components/Header";
import { GlobalContainer } from "../styles/GlobalStyles";
import { API } from "../config";
import { GoogleLogin } from 'react-google-login';

export default function Login() {
  let navigate = useNavigate();

  const responseSuccess = async (response) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tokenId: response.tokenId
        })
      }
      const res = await fetch(`${API}/auth/googlelogin`, options);
      const data = await res.json();
      if(res.ok) {
        localStorage.setItem('token', data.token);
        message.success('Login Successfully');
        navigate('/');
      } else {
        message.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const responseFailure = async (res) => {}

  return (
    <div>
      <Header />
      <GlobalContainer>
        <Wrapper>
          <Container>
            <Title>Welcome to <span style={{color: '#03A9F4'}}>Selendra Airdrop</span></Title>
            <Text>We make it easy for everyone to claim an airdrop.</Text>
            <GoogleLoginCustom 
              clientId='920463513406-g1i2qqcc3rcd8t6764aodi81mnbjb7p3.apps.googleusercontent.com'
              onSuccess={responseSuccess}
              onFailure={responseFailure}
              cookiePolicy={'single_host_origin'}
            />
          </Container>
        </Wrapper>
      </GlobalContainer>
    </div>
  )
}

const Title = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16pt;
  line-height: 16pt;
`;
const Container = styled.div`
  width: 100%;
  background: #111529;
  padding: 24pt;
  border-radius: 8px;
`;
const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16pt;
`;
const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 4rem 0;
`;
const GoogleLoginCustom = styled(GoogleLogin)`
  width: 100%;
  margin-top: 16pt;
  border-radius: 8px!important;
  svg {
    display: flex;
    margin: 0;
  }
  span {
    font-size: 14px;
    font-weight: 600!important;
    color: #03A9F4;
  }
`;