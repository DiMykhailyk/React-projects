import React from 'react'
import styled from 'styled-components';
import CustomButton from "../atoms/Button";
import {useSteps} from "../../context/StepsContext";

type Props = {
    closeModal?: () => void;
    imageSrc: string | undefined;
    shopName: string | undefined;
}
const ConnectedStore = ({closeModal, imageSrc, shopName}: Props) => {
    const {stepIncrement} = useSteps();
    const handleClose = () => {
        if (closeModal) {
            closeModal()
        }
        stepIncrement()
    }
    return (
        <Wrapper>
            <IconConnected src={imageSrc}/>
            <MainText>Store connected</MainText>
            <InfoText>Chad is now able to manage customer support requests for {shopName}.</InfoText>
            <CustomButton text='Continue' onClick={handleClose}/>
            <TextLink>
                <p>Wrong store?</p>
                <a href='#'>Connect another one</a>
            </TextLink>
        </Wrapper>
    );
};

const Wrapper = styled('div')`
  display: flex;
  font-family: 'Inter', serif;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`

const IconConnected = styled.img`
  width: 100px;
  height: 100px;
`

const MainText = styled('p')`
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 100%;
`

const InfoText = styled('div')`
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  color: #5F82A0;
  text-align: center;
`

const TextLink = styled('div')`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  margin-top: -13px;

  p {
    margin-right: 5px;
    color: #464A53;
  }

  a {
    color: #469fd2;
    text-decoration: auto;
  }
`

export default ConnectedStore;