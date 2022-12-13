import React from 'react';
import {styled} from "@mui/material";
import CustomButton from "../atoms/Button";
import {useSteps} from "../../context/StepsContext";

type Props = {
    openWelcome: () => void;
}

const GoogleAccount = ({openWelcome}: Props) => {

    const {stepIncrement} = useSteps();

    const handleWelcome = () => {
        if (openWelcome) {
            openWelcome()
            stepIncrement()
        }
    }

    return (
        <Wrapper>
            <OopsText>Oops! Click next page:)</OopsText>
            <CustomButton text='Click' onClick={handleWelcome}/>
        </Wrapper>
    );
};


const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`

const OopsText = styled('div')`
  font-size: 28px;
  font-weight: 400;
`

export default GoogleAccount;