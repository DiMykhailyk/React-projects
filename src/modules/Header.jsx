import React from 'react';
import styled from 'styled-components';
import cat from '../ui/resources/svg/cat.svg'
import background from '../ui/resources/svg/background.svg'
import {Button} from '@mui/material';

const Header = () => {
    return (
        <>
            <Wrapper>
                <LeftSide>
                    <CatIcon/>
                    <p>TESTTASK</p>
                </LeftSide>
                <RightSide>
                    <Button color='primary' variant='contained'>Users</Button>
                    <Button color='primary' variant='contained'>Sign up</Button>
                </RightSide>
            </Wrapper>
            <BackgroundWrapper>
                <IconBackground>
                    <InfoBackgroundWrapper>
                        <h1>Test assignment for front-end developer</h1>
                        <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS
                            with a vast understanding of User design thinking as they'll be building web interfaces with
                            accessibility in mind. They should also be excited to learn, as the world of Front-End
                            Development keeps evolving.</p>
                        <Button color='primary' variant='contained'>Sign Up</Button>
                    </InfoBackgroundWrapper>
                </IconBackground>
            </BackgroundWrapper>
        </>
    )
}

const Wrapper = styled('header')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);

  @media (max-width: 2560px) {
    button {
      width: 120px;
      height: 35px;
    }
  }
`

const BackgroundWrapper = styled('div')`
  display: flex;
  width: 100%;

  @media (max-width: 2560px) {
    width: 55%;
  }
`

const InfoBackgroundWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  height: 100%;
  width: 50%;
  color: white;

  h1, p {
    text-align: center;
  }


  @media (max-width: 360px) {
      width: 100%;
    p {
      font-size: 20px;
    }
    button {
      margin-bottom: 20px;
    }
  }
`

const IconBackground = styled('div')`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background}) no-repeat;
  background-size: cover;
  height: 1000px;
  width: 100%;
  -webkit-background-size: cover;


  @media (max-width: 2560px) {
    button {
      width: 115px;
      height: 39px;
    }
  }
  
  @media (max-width: 360px) {
    height: 100%;
  }
`

const LeftSide = styled('div')`
  display: flex;
  align-items: center;
  margin-left: 25px;

  @media (max-width: 2560px) {
    margin-left: 22.5%;
  }
  
  @media (max-width: 1024px) {
    margin-left: 40px;
  }
  
  @media (max-width: 360px) {
    margin-left: 10px;

    p {
     font-size: 16px;
    }
  }

`

const RightSide = styled('div')`
  display: flex;
  align-items: center;

  button {
    margin: 0 10px;
  }
  @media (max-width: 2560px) {
    margin-right: 22%;
  }

  @media (max-width: 1024px) {
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    margin-right: 40px;
  }

  @media (max-width: 360px) {
    
    button {
      height: 35px;
      width: 90px;
      font-size: 17px;
      margin: 0 8px;
    }
  }
`

const CatIcon = styled.img.attrs(({
    src: cat,
}))`
  width: 50px;
  height: 50px;
`


export default Header;