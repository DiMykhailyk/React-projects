import React from 'react';
import {Button, styled} from '@mui/material'

interface Props {
    text: string;
    onClick: () => any;
}
const CustomButton = ({text, onClick}: Props) => {
    return (
        <StyledButton onClick={onClick}>{text}</StyledButton>
    )
}


const StyledButton = styled(Button)`
  width: 400px;
  height: 45px;
  background: #32ABF2;
  border-radius: 8px;
  color: white;
  text-transform: initial;
`

export default CustomButton;
