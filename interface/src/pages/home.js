import { Button, Form, Input } from "antd";
import { useContext, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Context } from "../context/context";
import { GlobalContainer } from "../styles/GlobalStyles";

export default function Home() {
  const {account} = useContext(Context);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Header auth />
      <GlobalContainer>
        <Title>Selendra Airdrop</Title>
        <Wrapper>
          <CardStyled>
            <Form layout="vertical" color="white">
              <FormItem label='Address'>
                <InputStyled placeholder="0x" value={account} />
              </FormItem>
              <Form.Item style={{margin: '0'}}>
                <ButtonStyled htmlType="submit">Claim</ButtonStyled>
              </Form.Item>
            </Form>
            <Share>Share the airdrop with your friends and family</Share>
          </CardStyled>
          <div style={{width: '460px'}}>
            <SubTitle>How to claim SEL tokens airdrop?</SubTitle>
            <Text>
              Step 1: Make sure you have Metamask wallet installed, then configured the BSC network within the Metamask. <br/>
              Step 2: Make sure you have some BNB to pay for transaction fees, 1-2 USD worth of BNB would be recommended to pay to the network. Though, it would only cost around USD 0.1 - USD 0.2. <br/>
              Step 3: Enter your BSC address and click on submit. This will fetch an authorization signature from the whitelisted address. <br/>
              Step 4: Confirm the transaction to claim your SEL tokens. This will send a transaction to the Airdrop smart contract. <br/>
            </Text>
          </div>
        </Wrapper>
      </GlobalContainer>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const CardStyled = styled.div`
  width: 400px;
  height: 100%;
  background: #111730;
  border-radius: 16px;
  padding: 1rem;
`
const FormItem = styled(Form.Item)`
  background: #0F152A;
  border-radius: 8px;
  label {
    font-weight: 700;
    color: #85858D;  
    padding: 10px;
  }
`
const InputStyled = styled(Input)`
  font-size: 16px;
  font-weight: bold;
  color: #FFF;
  background: #0F152A;
  border: none;
  border-radius: 8px;
  &:focus {
    box-shadow: none!important;
  }
`
const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
`
const SubTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #F49D09;
`
const Text = styled.p`
  font-size: 14px;
  color: #5D7290;
`
const ButtonStyled = styled(Button)`
  width: 100%;
  height: 45px;
  color: #FFF;
  font-weight: 500;
  background: #F49D09;
  border: none;
  border-radius: 8px;
  :hover,
  :focus {
    background: #CF8609;
    color: #FFF;
  }
`
const Share = styled.p`
  font-size: 14px;
  padding-top: 5px;
  margin: 0;
`