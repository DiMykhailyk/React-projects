import styled from 'styled-components';
import check from '../../ui/resources/svg/check.svg';
import CustomButton from "../atoms/Button";
import React, {useState} from "react";
import {StyledLoadingButton} from "./SignUp";
import {getShopifyToken, ShopifyData} from "../../api/api";

type Props = {
    openModalConnect?: () => void;
    openModalNotUse?: () => void;
    setShopifyToken: (token: ShopifyData) => void;
    name: string

}
const ConnectShopify = ({openModalConnect, openModalNotUse, setShopifyToken, name}: Props) => {

    const [loading, setLoading] = useState(false)
    const handleConnectShopify = () => {
        if (openModalConnect) {
            openModalConnect()
        }
    }

    const handleNotUseShopify = () => {
        if (openModalNotUse) {
            openModalNotUse()
        }
    }

    const sendRequestToShopify = () => {
        setLoading(true)
        getShopifyToken(name)
            .then(token => setShopifyToken(token))
            .finally(() => {
                setLoading(false)
                handleConnectShopify()
            })
    }

    return (
        <Wrapper>
            <ConnectText>Connect your Shopify store</ConnectText>
            <InfoText>This installs the Chad widget in your Shopify store and sets it up to display information that is
                relevant to your customers.</InfoText>
            <WrapperCheck>
                <IconCheck/>
                <WrapperCheckText>
                    <CheckText>Track orders and shipping</CheckText>
                    <CheckInfoText>Allow your customers to track order and shipping status on Shopify</CheckInfoText>
                </WrapperCheckText>
            </WrapperCheck>
            <WrapperCheck>
                <IconCheck/>
                <WrapperCheckText>
                    <CheckText>Check inventory</CheckText>
                    <CheckInfoText>Automatically check Shopify inventory when your customers ask for
                        replacements</CheckInfoText>
                </WrapperCheckText>
            </WrapperCheck>
            <WrapperCheck>
                <IconCheck/>
                <WrapperCheckText>
                    <CheckText>Process payments</CheckText>
                    <CheckInfoText>Process refunds according to your Store Policy</CheckInfoText>
                </WrapperCheckText>
            </WrapperCheck>
            {loading ?
                <StyledLoadingButton loading={loading} variant="outlined"/>
                :
                <CustomButton
                    text={'Connect store'}
                    onClick={sendRequestToShopify}/>
            }
            <Link href='#' onClick={handleNotUseShopify}>I don’t use Shopify</Link>
        </Wrapper>
    )
};

const Wrapper = styled('div')`
  display: flex;
  font-family: 'Inter', serif;
  flex-direction: column;
`

const ConnectText = styled('p')`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
`

const InfoText = styled('div')`
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  color: #859AAB;
`

const WrapperCheck = styled('div')`
  display: flex;
  margin-top: 25px;
`

const WrapperCheckText = styled('div')`
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-left: 13px;
`


const CheckText = styled('div')`
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #5E636E
`

const CheckInfoText = styled('div')`
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  color: #9196A1
`

const IconCheck = styled.img.attrs(({
    src: check,
}))`
  width: 15px;
  height: 15px;
  margin-top: 6px;
`

const Link = styled('a')`
  color: #757C8A;
  font-size: 12px;
  letter-spacing: -0.01em;
  font-weight: 400;
  margin-left: 160px;
`

export default ConnectShopify;