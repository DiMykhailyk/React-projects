import CustomButton from "../atoms/Button";
import styled from "styled-components";
import {InputLabel, Select, SelectChangeEvent, MenuItem} from "@mui/material";
import {useState} from "react";
import {useSteps} from "../../context/StepsContext";

const platforms = [
    'Salesforce',
    'Ecwid',
    'Other',
];

const NotUseShopify = () => {

    const [platformsState, setPlatformsState] = useState<string[] | string>([]);

    const {stepIncrement} = useSteps();

    const handleChange = (event: SelectChangeEvent<typeof platformsState>) => {
        const {
            target: { value },
        } = event;
        setPlatformsState(
            value,
        );
    };

    return (
        <Wrapper>
            <MainText>Don’t use Shopify?</MainText>
            <InfoText>Unfortunately, Chad Beta is currently only available on Shopify. Let us know what platform you use
                and we’ll let you know when Chad becomes available there.</InfoText>
            <SelectWrapper>
            <InputLabel id="label">Platform</InputLabel>
            <Select
                value={platformsState}
                onChange={handleChange}
                sx={{ height: '50px', borderColor: '#32ABF2'}}
                >
                {platforms.map((platforms) => (
                    <MenuItem
                        key={platforms}
                        value={platforms}
                    >
                        {platforms}
                    </MenuItem>
                ))}
            </Select>
            </SelectWrapper>
            <CustomButton text='Submit' onClick={stepIncrement}/>
            <TextLink>
                <p>Actually use Shopify?</p>
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

export default NotUseShopify;