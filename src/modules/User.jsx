import React from 'react';
import styled from 'styled-components';

const User = ({email, name, phone, photo, position }) => {
    return (
        <Wrapper>
            <Photo src={photo} />
            <Name>{name}</Name>
            <Position>{position}</Position>
            <Email>{email}</Email>
            <Phone>{phone}</Phone>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Photo = styled('img')`
  border-radius: 100px;
`

const Name = styled('p')``
const Position = styled('p')``
const Email = styled('p')``
const Phone = styled('p')``

export default User;




