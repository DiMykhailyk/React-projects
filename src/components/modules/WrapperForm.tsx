import React, {useEffect, useState} from 'react';
import chad from '../../ui/resources/svg/chad.svg';
import styled from "styled-components";
import {useSteps} from "../../context/StepsContext";
import SignUp from "./SignUp";
import ConnectShopify from "./ConnectShopify";
import ConnectEmail from './ConnectEmail';
import ConnectedStore from "./ConnectedStore";
import NotUseShopify from './NotUseShopify';
import NotUseGmail from './NotUseGmail';
import WelcomeFriend from './WelcomeFriend';
import GoogleAccount from './GoogleAccount';
import {RegisterData, sendRegisterData, ShopifyData} from "../../api/api";

const WrapperForm = () => {
    const {currentStep} = useSteps();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [googleToken, setGoogleToken] = useState('');
    const [shopifyToken, setShopifyToken] = useState<ShopifyData | undefined>(undefined);
    const [password, setPassword] = useState('');
    const [isModalConnectShopify, setIsModalConnectShopify] = useState(false);
    const [isModalNotShopify, setIsModalNotShopify] = useState(false);
    const [isModalNotUseGmail, setIsModalNotUseGmail] = useState(false);
    const [isWelcome, setIsWelcome] = useState(false);
    const [isGoogleAcc, setIsGoogleAcc] = useState(false);

    useEffect(() => {
        handleRegisterUser()
    }, [googleToken])
    useEffect(() => {
        handleInitialState()
    }, [currentStep])

    useEffect(() => {
        handleRenderPage()
    }, [currentStep])

    const handleRegisterUser = () => {
        if (!googleToken || !shopifyToken || !password || !name || !email) {
            return
        }
        const data: RegisterData = {
            google_token: googleToken,
            shop_token: shopifyToken.token,
            name,
            email,
            password,
        }
        sendRegisterData(data)
            .then(res => res)
    }

    const handleShopifyToken = (token: ShopifyData) => {
        if (token) {
            setShopifyToken(token)
        }
    }

    const handleGoogleToken = (token: string) => {
        if (token) {
            setGoogleToken(token)
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleInitialState = () => {
        setIsModalConnectShopify(false)
        setIsModalNotShopify(false)
        setIsModalNotUseGmail(false)
        setIsGoogleAcc(false)
        setIsWelcome(false)
    }

    const handleIsOpenShopify = () => {
        setIsModalConnectShopify(true)
    }

    const handleIsCloseShopify = () => {
        setIsModalConnectShopify(false)
    }

    const handleIsOpenNotShopify = () => {
        setIsModalNotShopify(true)
    }

    const handleIsOpenNotGmail = () => {
        setIsModalNotUseGmail(true)
    }

    const handleIsWelcome = () => {
        setIsWelcome(true)
    }

    const handleIsGoogleAcc = () => {
        setIsGoogleAcc(true)
    }

    const handleRenderPage = () => {
        if (currentStep === 0) {
            return <SignUp
                email={email}
                name={name}
                password={password}
                handlePasswordChange={handlePasswordChange}
                handleNameChange={handleNameChange}
                handleEmailChange={handleEmailChange}
            />
        }

        if (currentStep === 1 &&
            !isModalConnectShopify &&
            !isModalNotShopify &&
            !isModalNotUseGmail &&
            !isWelcome &&
            !isGoogleAcc) {
            return <ConnectShopify name={name} setShopifyToken={handleShopifyToken}
                                   openModalConnect={handleIsOpenShopify} openModalNotUse={handleIsOpenNotShopify}/>
        }

        if (currentStep === 1 &&
            isModalConnectShopify &&
            !isModalNotUseGmail &&
            !isModalNotShopify &&
            !isWelcome &&
            !isGoogleAcc) {
            return <ConnectedStore shopName={shopifyToken?.shop_name} imageSrc={shopifyToken?.shop_logo_url}
                                   closeModal={handleIsCloseShopify}/>
        }

        if (currentStep === 1 &&
            isModalNotShopify &&
            !isModalConnectShopify &&
            !isModalNotUseGmail &&
            !isWelcome &&
            !isGoogleAcc) {
            return <NotUseShopify/>
        }

        if (currentStep === 2 &&
            !isModalNotUseGmail &&
            !isModalConnectShopify &&
            !isModalNotShopify &&
            !isWelcome &&
            !isGoogleAcc) {
            return (<ConnectEmail
                setGoogleToken={handleGoogleToken}
                openModalNotUseGmail={handleIsOpenNotGmail}
                openGoogleAcc={handleIsGoogleAcc}
            />)
        }

        if (currentStep === 2 &&
            isModalNotUseGmail &&
            !isModalConnectShopify &&
            !isModalNotShopify &&
            !isWelcome &&
            !isGoogleAcc) {
            return <NotUseGmail/>
        }

        if (currentStep === 3) {
            return <GoogleAccount openWelcome={handleIsWelcome}/>
        }

        if (currentStep === 4) {
            return <WelcomeFriend name={name}/>
        }

        return <SignUp
            email={email}
            name={name}
            password={password}
            handlePasswordChange={handlePasswordChange}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
        />
    }


    const isCurrentSteps = () => {
        if (currentStep === 0) {
            return '680px'
        }

        if (currentStep === 1 && !isModalConnectShopify && !isModalNotShopify) {
            return '630px'
        }

        if (currentStep === 1 && isModalConnectShopify && !isModalNotShopify) {
            return '470px'
        }

        if (currentStep === 1 && isModalNotShopify && !isModalConnectShopify) {
            return '500px'
        }

        if (currentStep === 2 && !isModalNotShopify && !isModalConnectShopify && isModalNotUseGmail) {
            return '500px'
        }

        if (currentStep === 2) {
            return '700px'
        }

        if (currentStep === 3) {
            return '200px'
        }

        if (currentStep === 4) {
            return '150px'
        }

        return '480px'
    }

    return (
        <WrapperMain>
            <Wrapper height={isCurrentSteps()}>
                {isModalConnectShopify || isWelcome || !isGoogleAcc ?
                    null
                    :
                    <TextChad>
                        <ChadIcon/>
                        Chad
                    </TextChad>
                }
                {handleRenderPage()}
            </Wrapper>
        </WrapperMain>
    )
}

const WrapperMain = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const Wrapper = styled('div')<{ height?: string }>`
  display: flex;
  justify-items: center;
  box-shadow: 0 5px 20px rgba(108, 117, 139, 0.2);
  border-radius: 8px;
  width: 500px;
  height: ${(props) => props.height};
  background-color: white;
  flex-direction: column;
  font-family: 'Eudoxus Sans', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #20496C;
  box-sizing: border-box;
  padding: 64px 50px;
`

const TextChad = styled('div')`
  display: flex;
  align-items: center;
`
const ChadIcon = styled.img.attrs(({
    src: chad,
}))`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`


export default WrapperForm;