import styled from "styled-components";
import Header from "../components/Header";
import { GlobalContainer } from "../styles/GlobalStyles";
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config";
import { useState } from "react";

export default function Register() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async(val) => {
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
      const res = await fetch(`${API}/auth/register`, options);
      const data = await res.json();
      if(res.ok) {
        message.success(data.data);
        navigate('/');
      } else {
        message.error(data.error);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
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
            onFinish={handleRegister}
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
              hasFeedback
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <InputStyled type='password' />
            </Form.Item>
            <Form.Item 
              label="Confirm Password"
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <InputStyled type='password' />
            </Form.Item>
            <Form.Item style={{margin: '0'}}>
              <ButtonStyled loading={loading} htmlType="submit">Register</ButtonStyled>
            </Form.Item>
          </Form>
          <Text>Already had an account? <Link to='/login'>Sign In</Link></Text>
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