import React, {useEffect, useState} from 'react';
import Users from '../Users/Users';
import s from './Main.module.scss'
import {getPositions, getToken, postUser, getUsers} from '../../api/usersApi';
import {Box, Button, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography} from "@mui/material";
import {regEmail, regPhone} from "../../constants/constants";
import successIcon from '../../ui/resources/svg/successRegistered.svg';

const Main = () => {    
    const [positions, setPositions] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [users, setUsers] = useState([]);
    const [positionId, setPositionId] = useState(0);
    const [imgSuccess, setImgSuccess] = useState(false)
    const [hideShowMore, setHideShowMore] = useState(false)
    const fileInput = React.createRef();
    const validEmail = regEmail.test(email);
    const validPhone = regPhone.test(phone);

    useEffect(() => {
        handleGetUsers()
        handleGetPositions()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setImgSuccess(false), 3000);
        return () => {
            clearTimeout(timer);
        }
    }, [imgSuccess]);


    const handleGetUsers = async (page = 1, count = 6) => {
        const result = await getUsers(page, count);
        if (result.success) {
            setUsers(result.users)
        }
        if (result.users.length === result.total_users) {
            setHideShowMore(true);
        }
    }

    const handleGetPositions = () => {
        const result = getPositions();
        result.then(data => {
            if (data.success) {
                setPositions(data.positions)
            }
        })
        result.catch(e => console.log('error', e))
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }


    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const handlePositionsChange = (e) => {    
        setPositionId(e.target.value)
    }

    const addUser = async () => {
        if (!name || !email || !phone || !positionId || !fileInput.current.files[0]) return

        const formData = new FormData()
        formData.append('position_id', positionId);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('photo', fileInput.current.files[0]);
        setImgSuccess(true)

        const data = await getToken();
        await postUser(data.token, formData)
        await handleGetUsers();
        data.catch(e => console.log('error', e))
}

    
    return (
        <div className={s.wrapper}>
            <Users users={users} handleGetUsers={handleGetUsers} hideShowMore={hideShowMore}/>
            {imgSuccess ?
                <img className={s.successIcon} src={successIcon}/>
                :
                <div className={s.loginWrapper} id="registration">
                    <div className={s.form}>
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
                            error={email && !validEmail}
                        >
                        </TextField>
                        <TextField
                            color='disabled'
                            label='Phone'
                            variant="outlined"
                            helperText='+38 (XXX) XXX - XX - XX'
                            value={phone}
                            onChange={handlePhoneChange}
                            error={phone && !validPhone}
                        >
                        </TextField>
                    </div>
                    <Box className={s.radioBox}>
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
                                        </Typography>
                                        <FormControlLabel
                                            value={position.id}
                                            control={<Radio onChange={handlePositionsChange} color='secondary'/>}
                                            key={position.id}
                                            label={position.name}/>
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </Box>
                    <div className={s.upload}>
                        <Stack direction="row" alignItems="center">
                            <Button color='background' variant="contained" component="label">
                                Upload
                                <input
                                    hidden
                                    accept="image/jpg, image/jpeg"
                                    multiple
                                    type="file"
                                    ref={fileInput}
                                />
                            </Button>
                            <TextField
                                color='disabled'
                                placeholder='Upload your photo'
                            >
                            </TextField>
                        </Stack>
                    </div>
                    <Button
                        color='disabled'
                        variant='contained'
                        onClick={addUser}
                    >
                        Sign up
                    </Button>
                </div>
            }
        </div>
    )
}

export default Main;