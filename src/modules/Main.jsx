import React, {useEffect, useState} from 'react';
import Users from './Users';
import {getPositions, getToken, postUser} from '../api/usersApi';
import {Box, Button, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography} from "@mui/material";
import styled from 'styled-components';
import {regEmail, regPhone} from "../constants/constants";
import successRegistered from "../ui/resources/svg/successRegistered.svg";

const Main = () => {
    const [positions, setPositions] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [positionId, setPositionId] = useState(0);
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // const fileField = document.querySelector('input[type="file"]')
    const fileInput = React.createRef();


    const validEmail = regEmail.test(email);
    const validPhone = regPhone.test(phone);

    // console.log('validEmail',validEmail)
    // console.log('validPhone',validPhone)

    const handleGetPositions = () => {
        const result = getPositions();

        result.then(data => {
            if (data.success) {
                console.log('data', data)
                setPositions(data.positions)
                setPositionId(data.positions.id)
            }
        })
        result.catch(e => console.log('error', e))
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setErrorEmail(!validEmail)
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
        setErrorPhone(!validPhone)
    }

    const handlePositionsChange = (e) => {
        setPositionId(e.target.value)
    }

    const addUser = () => {
        if (name === '' || email === '' || phone === '') {
            return
        }
        const formData = new FormData()

        formData.append('position_id', 2);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('photo', fileInput.current.files[0]);

        const token = getToken()
            .then(data => data.token)
            .then(token => {
                postUser(token, formData)
                    .then(data => {
                        if (data.success) {
                        }
                    })
            })
        token.catch(e => console.log('error', e))


        // formData.append('photo', fileField.files[0]);

        console.log('fileInput.current.files[0]', fileInput.current.files[0])
    }

    useEffect(() => {
        handleGetPositions()
    }, [])

    console.log('position', positions)
    console.log('positionId', positionId)

    return (
        <>
            <Wrapper>
                <Users/>
                <LoginWrapper>
                    <Form>
                        <TextField
                            color='disabled'
                            label='Your name'
                            variant="outlined"
                            value={name}
                            onChange={handleNameChange}
                            inputProps={{maxLength: 60, minLength: 2}}
                            fullWidth
                        >
                        </TextField>
                        <TextField
                            color='disabled'
                            label='Email'
                            variant="outlined"
                            value={email}
                            inputProps={{maxLength: 100, minLength: 2}}
                            onChange={handleEmailChange}
                            error={errorEmail}
                        >
                        </TextField>
                        <TextField
                            color='disabled'
                            label='Phone'
                            variant="outlined"
                            helperText='+38 (XXX) XXX - XX - XX'
                            value={phone}
                            onChange={handlePhoneChange}
                            error={errorPhone}
                        >
                        </TextField>
                    </Form>
                    <RadioBox>
                        <p>Select your position</p>
                        <RadioGroup>
                            {positions.map(position => {
                                return (
                                    <div
                                        key={position.id}
                                    >
                                        <Typography
                                            fontWeight="s"
                                            sx={{letterSpacing: '0.20rem'}}
                                            mb={1}
                                        >
                                            Select your position
                                        </Typography> &&
                                        <FormControlLabel
                                            value={position.name}
                                            control={<Radio onChange={handlePositionsChange} color='secondary'/>}
                                            key={position.id}
                                            label={position.name}/>
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </RadioBox>
                    <Upload>
                        <Stack direction="row" alignItems="center">
                            <Button color='background' variant="contained" component="label">
                                Upload
                                <input
                                    hidden
                                    accept="image/jpg, image/jpeg"
                                    multiple
                                    type="file"
                                    ref={fileInput}
                                    min-size="5501"
                                />
                            </Button>
                            <TextField
                                color='disabled'
                                placeholder='Upload your photo'
                            >
                            </TextField>
                        </Stack>
                    </Upload>
                    <Button
                        color='disabled'
                        variant='contained'
                        onClick={addUser}
                    >
                        Sign up
                    </Button>
                </LoginWrapper>
            </Wrapper>
            <SuccsessImage/>
        </>
    )
}

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  button {
    width: 141px;
    height: 35px;
  }

  button:last-child {
    width: 120px;
    margin: 40px;
    right: 27px;
  }
`

const RadioBox = styled(Box)`
  margin-right: 256px;

  p {
    font-size: 18px;
    line-height: 0;
  }

  @media (min-width: 360px) {
    margin-right: 150px;
  }
`;

const Upload = styled('div')`
  margin-top: 30px;

  div {
    border-radius: 0 4px 4px 0;
    width: 300px;
  }

  label {
    border-radius: 4px 0 0 4px;
    border: 1px solid black;
    height: 55px;
    margin: 0;
  }

  @media (min-width: 360px) {
    div {
      width: 100%;
    }
  }
`;

const LoginWrapper = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const Form = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  div {
    width: 400px;
    margin-bottom: 25px;
  }

  p {
    margin-top: -15px;
  }

  @media (min-width: 360px) {
    div {
      width: 340px;
      max-width: 100%;
    }
  }
`

const SuccsessImage = styled.img.attrs(({
    src: successRegistered,
}))`
  width: 50px;
  height: 50px;
`

export default Main;