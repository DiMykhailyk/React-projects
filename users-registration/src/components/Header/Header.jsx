import React from 'react';
import s from './Header.module.scss'
import cat from '../../ui/resources/svg/cat.svg'      
import {Button} from '@mui/material';
import { testAssigmentH1, mainTextHeaderP } from '../../constants/constants';

const Header = () => {

    const handleScrollToUsers = () => {
       const usersWrapper = document.getElementById('users_wrapper');
       usersWrapper.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }

    const handleScrollToRegistration = () => {
        const registration = document.getElementById('registration');
        registration.scrollIntoView({ 
         behavior: 'smooth' 
       });
     }

    return (
        <>
            <header className={s.wrapper}>
                <div className={s.leftSide}>
                    <img className={s.catIcon} src={cat}/>
                    <p>TESTTASK</p>
                </div>
                <div className={s.rightSide}>
                    <Button color='primary' variant='contained' onClick={handleScrollToUsers}>Users</Button>
                    <Button color='primary' variant='contained' onClick={handleScrollToRegistration}>Sign up</Button>
                </div>
            </header>
            <div className={s.backgroundWrapper}>
                <div className={s.iconBackground}>
                    <div className={s.infoBackgroundWrapper}>
                        <h1>{testAssigmentH1}</h1>
                        <p>{mainTextHeaderP}</p>
                        <Button color='primary' variant='contained' onClick={handleScrollToRegistration}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;