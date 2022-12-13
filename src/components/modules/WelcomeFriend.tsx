import React from 'react'
import {styled} from "@mui/material";

type Props = {
    name: string;
};

const WelcomeFriend = ({name}: Props) => {
    return (
        <Wrapper>
            <WelcomeText>You are welcome {name}! :)</WelcomeText>
        </Wrapper>
    );
};


const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`

const WelcomeText = styled('div')`
  font-size: 28px;
  font-weight: 400;
`

export default WelcomeFriend;