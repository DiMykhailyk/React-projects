import React from 'react';
import s from './User.module.scss'

const User = ({email, name, phone, photo, position }) => {
    return (
        <div className={s.wrapper}>
            <img className={s.photo} src={photo} />
            <p>{name}</p>
            <p>{position}</p>
            <p>{email}</p>
            <p>{phone}</p>
        </div>
    )
}
export default User;




