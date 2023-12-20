import React, {useEffect, useState} from 'react';
import s from './Users.module.scss'
import {Button} from '@mui/material';
import {getUsers} from "../../api/usersApi";
import User from '../User/User';

const Users = ({users, handleGetUsers, hideShowMore}) => {
    const [showMore, setShowMore] = useState(false)
    const handleMoreUsers = () => {
        setShowMore(!showMore)
        handleGetUsers(1, 6 + users.length)
    }

    return (
        <>
            <div className={s.wrapperCards} id="users_wrapper">
                {users.map(user => {
                    return (
                        <div
                            key={user.id}
                            className={s.card}
                        >
                            <User
                                phone={user.phone}
                                photo={user.photo}
                                name={user.name}
                                email={user.email}
                                position={user.position}
                            />
                        </div>
                    )
                })}
            </div>
            {hideShowMore ?
                null
                :
                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => handleMoreUsers()}
                >
                    Show more
                </Button>
            }
        </>
    )
}

export default Users;