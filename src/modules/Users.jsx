import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button} from '@mui/material';
import {getUsers} from "../api/usersApi";
import User from './User';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(false)
    const [hideShowMore, setHideShowMore] = useState(false)
    const handleGetUsers = (page = 1, count = 6) => {
        const result = getUsers(page, count);
        result.then(data => {
            if (data.success) {
                setUsers(data.users)
            }
            if (data.users.length === data.total_users) {
                setHideShowMore(true)
            }
        })
        result.catch(e => console.log('error', e))
    }


    const handleMoreUsers = () => {
        setShowMore(!showMore)
        handleGetUsers(1, 6 + users.length)
    }

    useEffect(() => {
        handleGetUsers()
    }, [])

    return (
        <>
            <WrapperCards>
                {users.map(user => {
                    return (
                        <Card
                            key={user.id}
                        >
                            <User
                                // key={user.id}
                                phone={user.phone}
                                photo={user.photo}
                                name={user.name}
                                email={user.email}
                                position={user.position}
                            />
                        </Card>
                    )
                })}
            </WrapperCards>
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

const WrapperCards = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  background-color: white;
  margin: 20px;
  padding: 20px;
  border: solid 1px white;
  border-radius: 15px;
  
  p {
    font-size: 17px;
    font-weight: 100;
    line-height: 0;
  }

  @media (min-height: 2560px) {
    width: 400px;
    height: 289px;

    p {
      font-size: 23px;
    }
  }

  @media (min-width: 1024px) {
    display: block;
    width: 230px;
    height: 190px;
  }
`

export default Users;