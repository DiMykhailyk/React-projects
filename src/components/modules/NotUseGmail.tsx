import React, {useState} from 'react'
import {InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import CustomButton from "../atoms/Button";
import styled from "styled-components";

const gmails = [
    'Microsoft Outlook',
    'Yahoo',
    'Other',
];

const NotUseGmail = () => {

    const [gmailsState, setGmailsState] = useState<string[] | string>([]);

    const handleChange = (event: SelectChangeEvent<typeof gmailsState>) => {
        const {
            target: {value},
        } = event;
        setGmailsState(
            value,
        );
    };

    return (
        <Wrapper>
            <MainText>Don’t use Gmail?</MainText>
            <InfoText>Unfortunately, Chad Beta only integrates with Gmail. Let us know what email client you use to
                receive customer support emails and we’ll let you know when we add it as an integration..</InfoText>
            <SelectWrapper>
                <InputLabel id="label">Platform</InputLabel>
                <Select
                    value={gmailsState}
                    onChange={handleChange}
                    sx={{height: '50px', borderColor: '#32ABF2'}}
                >
                    {gmails.map((gmails) => (
                        <MenuItem
                            key={gmails}
                            value={gmails}
                        >
                            {gmails}
                        </MenuItem>
                    ))}
                </Select>
            </SelectWrapper>
            <CustomButton text='Submit' onClick={() => null}/>
            <TextLink>
                <p>Actually use Gmail?</p>
                <a href='#'>Connect</a>
            </TextLink>
        </Wrapper>
    );
}

const Wrapper = styled('div')`
  display: flex;
  font-family: 'Inter', serif;
  flex-direction: column;
`

const MainText = styled('p')`
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 100%;
`

const InfoText = styled('div')`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #859AAB;
`

const TextLink = styled('div')`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  margin-top: -13px;
  justify-content: center;

  p {
    margin-right: 5px;
    color: #464A53;
  }

  a {
    color: #469fd2;
    text-decoration: auto;
  }
`

const SelectWrapper = styled('div')`
  margin: 22px 0 12px 0;

  div {
    width: 100%;
  }

  label {
    margin: 0 0 10px 0;
  }
`

export default NotUseGmail
