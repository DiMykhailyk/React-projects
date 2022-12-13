import React from 'react'
import styled from "styled-components";
import check from "../../ui/resources/svg/check.svg";
import GoogleButton from 'react-google-button'
import {getGoogleToken} from "../../api/api";
import {useSteps} from "../../context/StepsContext";

type Props = {
    openModalNotUseGmail?: () => void;
    setGoogleToken: (token: string) => void;
    openGoogleAcc: () => void;
}

const ConnectEmail = ({openModalNotUseGmail, setGoogleToken, openGoogleAcc}: Props) => {

    const {stepIncrement} = useSteps();

    const handleNotUseGmail = () => {
        if (openModalNotUseGmail) {
            openModalNotUseGmail()
        }
    }

    const handleResponse = () => {
        getGoogleToken()
            .then((data) => setGoogleToken(data.token))
        stepIncrement()
        openGoogleAcc()
    }

    return (
        <Wrapper>
            <ConnectText>Connect your customer support email</ConnectText>
            <InfoText>Allows Chad to send automated rote responses on your behalf, for instance to confirm that a
                customer’s missing item complaint is being evaluated.</InfoText>
            <WrapperCheck>
                <IconCheck/>
                <WrapperCheckText>
                    <CheckText>Automated rote responses</CheckText>
                    <CheckInfoText>Lets your customers know that you’ve received their support request and are working
                        on it</CheckInfoText>
                </WrapperCheckText>
            </WrapperCheck>
            <WrapperCheck>
                <IconCheck/>
                <WrapperCheckText>
                    <CheckText>Customized situational responses</CheckText>
                    <CheckInfoText>Designate auto responses to any support situation ranging from “where’s my stuff?” to
                        “I want a refund”</CheckInfoText>
                </WrapperCheckText>
            </WrapperCheck>
            <WrapperCheck>
                <IconCheck/>
                <WrapperCheckText>
                    <CheckText>Automatically tags inbox by category</CheckText>
                    <CheckInfoText>Reads your inbound support emails and tags your emails with the problem category so
                        you always know what to expect before even opening an email</CheckInfoText>
                </WrapperCheckText>
            </WrapperCheck>
            <StyledGoogleButton
                onClick={handleResponse}
                style={{width: '390px', background: '#5383EC'}}
            />
            <Link href='#' onClick={handleNotUseGmail}>I don’t use Gmail</Link>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
  display: flex;
  font-family: 'Inter', serif;
  flex-direction: column;
  align-items: center;
`

const ConnectText = styled('p')`
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 33px;
  margin: 15px 0 10px 0;
`

const InfoText = styled('div')`
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  color: #859AAB;
`

const WrapperCheck = styled('div')`
  display: flex;
  margin-top: 30px;
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
  line-height: 20px;
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
`

const StyledGoogleButton = styled(GoogleButton)`
  margin-top: 38px;
`

export default ConnectEmail;