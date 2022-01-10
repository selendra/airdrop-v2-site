import { Button, Form, Input, message } from "antd";
import { useContext, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Context } from "../context/context";
import { GlobalContainer } from "../styles/GlobalStyles";
import { Contract } from "../utils/useContract";
import { API } from '../config/index';
import { ethers } from "ethers";
import { ErrorHandling } from "../utils/errorHandling";
import Share from "../components/Share";

export default function Home() {
  const {account} = useContext(Context);
  const [loading, setLoading] = useState(false);

  const handleClaim = async() => {
    try {
      if(!account) return message.error('Please provide a wallet address');
      setLoading(true);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          wallet: account
        })
      }
      const response = await fetch(`${API}/sign`, options);
      const data = await response.json();
      if(response.ok) {
        const contract = await Contract();
        const res = await contract.claim(
          data.data.amount,
          data.data.Date,
          data.data.v,
          data.data.r,
          data.data.s
        )
        async function PendingApprove() {
          try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const result = await provider.getTransactionReceipt(res.hash);
            if (result === null) {
              setTimeout(() => {
                PendingApprove();
              }, 2000);
            } else if (result !== null) {
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
          }
        }
  
        setTimeout(() => {
          PendingApprove();
        }, 2000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      ErrorHandling(error);
      setLoading(false);
    }
  }

  return (
    <div>
      <Header auth />
      <GlobalContainer>
        <Title>Selendra Airdrop</Title>
        <Wrapper>
          <CardStyled>
            <Form layout="vertical" color="white" onFinish={handleClaim}>
              <FormItem label='Address'>
                <InputStyled placeholder="0x" value={account} />
              </FormItem>
              <Form.Item style={{margin: '0'}}>
                <ButtonStyled loading={loading} htmlType="submit">Claim</ButtonStyled>
              </Form.Item>
            </Form>
            <Share />
          </CardStyled>
          <div style={{maxWidth: '460px', width: '100%'}}>
            <SubTitle>How to claim SEL tokens airdrop?</SubTitle>
            <Text>
              Step 1: Make sure you have Metamask wallet installed, then configured the BSC network within the Metamask. <br/>
              Step 2: Make sure you have some BNB to pay for transaction fees, 1-2 USD worth of BNB would be recommended to pay to the network. Though, it would only cost around USD 0.1 - USD 0.2. <br/>
              Step 3: Click on claim. This will fetch an authorization signature from the whitelisted addresses. <br/>
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
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`
const CardStyled = styled.div`
  max-width: 400px;
  width: 100%;
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
  font-size: 32px;
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
// const Share = styled.p`
//   font-size: 14px;
//   padding-top: 5px;
//   margin: 0;
// `