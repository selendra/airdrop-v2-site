import styled from "styled-components/macro";
import Header from "../components/Header";
import { GlobalContainer } from "../styles/GlobalStyles";
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config";
import { useState } from "react";

export default function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async(val) => {
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: val.email,
          password: val.password
        })
      }
      const res = await fetch(`${API}/auth/login`, options);
      const data = await res.json();
      if(res.ok) {
        localStorage.setItem('token', data.token);
        message.success('Login Successfully')
        navigate('/');
      } else {
        message.error(data.error);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong!');
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <GlobalContainer>
        <Wrapper>
          <Title>Sign In with email</Title>
          <Form
            layout="vertical"
            onFinish={handleLogin}
          >
            <Form.Item 
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <InputStyled />
            </Form.Item>
            <Form.Item 
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <InputStyled type='password' />
            </Form.Item>
            <Form.Item style={{margin: '0'}}>
              <ButtonStyled loading={loading} htmlType="submit">Sign In</ButtonStyled>
            </Form.Item>
          </Form>
          <Text>Don't have an account? <Link to='/register'>Register</Link></Text>
        </Wrapper>
      </GlobalContainer>
    </div>
  )
}

const Title = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 1rem;
`
const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
`
const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem 0;
`
const InputStyled = styled(Input)`
  width: 100%;
  height: 50px;
  color: #FFF;
  background: #0F152A!important;
  border: none;
  border-radius: 8px;
`
const ButtonStyled = styled(Button)`
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 8px;
  color: #FFF;
  background: #F49D09;
  font-weight: 600;
  :hover,
  :focus {
    background: #CF8609;
    color: #FFF;
  }
`