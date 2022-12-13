import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import CustomButton from "../atoms/Button";
import {regEmail} from "../../constants/constans";
import visibilityEye from '../../ui/resources/svg/visibilityEye.svg';
import visibilityOffEye from '../../ui/resources/svg/visibilityOffEye.svg';
import {useSteps} from "../../context/StepsContext";
import {getGoogleToken} from "../../api/api";

interface TouchedState {
    email: boolean;
    name: boolean;
    password: boolean;
}

type Props = {
    email: string;
    name: string;
    password: string;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUp = ({email, name, password, handlePasswordChange, handleNameChange, handleEmailChange}: Props) => {

    const [showPassword, setShowPassword] = useState(false)
    const [touchedField, setTouchedField] = useState<TouchedState>({
        email: false,
        name: false,
        password: false,
    })
    const [loading, setLoading] = useState(false);
    const [stateNameButton, setStateNameButton] = useState(false)

    const {stepIncrement} = useSteps();

    const {email: touchedEmail, name: touchedName, password: touchedPassword} = touchedField;

    const errorEmail = !regEmail.test(email);

    useEffect(() => {
        getGoogleToken()
            .then(data => data)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [loading]);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleToucheField = (field: keyof TouchedState) => () => {
        setTouchedField({
            ...touchedField,
            [field]: true
        })
    }

    const handleClick = () => {
        if (!errorEmail && name && password) {
            setLoading(true);
            setStateNameButton(true)
        }
        if (errorEmail || !name || !password) {
            return
        }
    }


    return (
        <Wrapper>
            <WelcomeText>Welcome to chad</WelcomeText>
            <InfoText>Go live in 10 minutes! Chad's self-service widget empowers your customers to manage orders and
                track shipments—with Chad, you can offer fast support 24/7 without going crazy.</InfoText>
            <FormControl sx={{mt: 5, width: '33ch'}}>
                <FormControl error={touchedEmail && (errorEmail || !email)}>
                    <InputLabel sx={{left: -10, top: -45}}>Email</InputLabel>
                    <TextField
                        onFocus={handleToucheField('email')}
                        error={touchedEmail && (errorEmail || !email)}
                        color='primary'
                        size="small"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        sx={{mb: 5, width: '33ch', background: email ? '#F8F9FC' : null}}
                        helperText={touchedEmail && !email ? 'This field cannot be empty' : null}
                    />
                </FormControl>
                <FormControl error={touchedName && !name}>
                    <InputLabel sx={{left: -10, top: -45}}>Your name</InputLabel>
                    <TextField
                        error={touchedName && !name}
                        onFocus={handleToucheField('name')}
                        color='primary'
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={handleNameChange}
                        sx={{mb: 5, width: '33ch', background: name ? '#F8F9FC' : null}}
                        helperText={touchedName && !name ? 'This field cannot be empty' : null}
                    />
                </FormControl>
                <FormControl sx={{mb: 2, width: '33ch'}}
                             error={touchedPassword && !password}
                >
                    <InputLabel sx={{left: -10, top: -45}}>Password</InputLabel>
                    <TextField
                        onFocus={handleToucheField('password')}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        size="small"
                        sx={{background: password ? '#F8F9FC' : null}}
                        onChange={handlePasswordChange}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <IconVisibilityOff/> : <IconVisibility/>}
                                    </IconButton>
                                </InputAdornment>
                        }
                        }
                    />
                    {
                        touchedPassword && !password
                            ?
                            <FormHelperText>This field cannot be empty</FormHelperText>
                            :
                            null
                    }
                </FormControl>
            </FormControl>
            {loading ?
                <StyledLoadingButton loading={loading} variant="outlined"/>
                :
                <CustomButton
                    text={!stateNameButton ? 'Create account' : 'Continue'}
                    onClick={!stateNameButton ? handleClick : stepIncrement}/>
            }

            <TextLink>
                <p>Already have an account?</p>
                <a href='#'>Login</a>
            </TextLink>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
  display: flex;
  font-family: 'Inter', serif;
  flex-direction: column;
`

const WelcomeText = styled('p')`
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

const TextLink = styled('div')`
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: center;
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

export const StyledLoadingButton = styled(LoadingButton)`

  div {
    width: 400px;
    height: 45px;
    background: #32ABF2;
    border-radius: 8px;
    color: white;
    text-transform: initial;
    margin-left: 155px;

    span {
      width: 22px;
      height: 22px;
      margin-left: 190px;
      margin-top: 14px;
    }
  }
`


const IconVisibility = styled.img.attrs(({
    src: visibilityEye,
}))`
  width: 15px;
  height: 15px;
`

const IconVisibilityOff = styled.img.attrs(({
    src: visibilityOffEye,
}))`
  width: 15px;
  height: 15px;
`

export default SignUp;