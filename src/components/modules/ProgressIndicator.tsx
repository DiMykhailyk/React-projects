import React from 'react'
import styled from 'styled-components';
import {Box, Button, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper} from "@mui/material";
import emptyCircle from '../../ui/resources/svg/emptyCircle.svg';
import doneCircle from '../../ui/resources/svg/doneCircle.svg';
import blackedOutCircle from '../../ui/resources/svg/blackedOutCircle.svg';
import leftArrow from '../../ui/resources/svg/leftArrow.svg';
import rightArrow from '../../ui/resources/svg/rightArrow.svg'
import {useSteps} from '../../context/StepsContext';

const ProgressIndicator = () => {

    const {steps, currentStep, stepIncrement, stepDecrement} = useSteps();

    const stepsValues = Object.values(steps)

    const handleIconsSteps = (index: number) => {

        if (index === currentStep) {
            return (<IconEmptyCircle/>)
        }
        if (index + 1 === currentStep || index < currentStep) {
            return (<IconDoneCircle/>)
        }

        if (index !== currentStep) {
            return (<IconBlackedOutCircle/>)
        }
        return null
    }

    return (
        <Wrapper>
            <Box sx={{width: '100%'}}>
                <Stepper
                    activeStep={currentStep}
                    orientation="vertical"
                    connector={<StepsConnector/>}
                    sx={{ml: 10}}
                >
                    {stepsValues.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};

                        return (
                            <StyledStep key={label} {...stepProps}>
                                <StepLabel
                                    {...labelProps}
                                    StepIconComponent={() => handleIconsSteps(index)}
                                    sx={{padding: 0}}
                                >
                                    {label}
                                </StepLabel>
                            </StyledStep>
                        );
                    })}
                </Stepper>
                {currentStep !== 0 &&
                    <>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 5,
                            backgroundColor: 'linear-gradient(339.02deg, #0D3251 0%, #19476C 103.05%)',
                        }}>
                            <Button
                                variant="outlined"
                                disabled={currentStep === 0}
                                onClick={stepDecrement}
                                sx={{ml: 8, borderColor: 'linear-gradient(339.02deg, #0D3251 0%, #19476C 103.05%)'}}
                                startIcon={<LeftArrowIcon/>}
                            >
                                Prev
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}/>
                            {currentStep === 4 ?
                                null
                                :
                                <Button
                                    onClick={stepIncrement}
                                    sx={{mr: 8}}
                                    endIcon={<RightArrowIcon/>}
                                >
                                    Next
                                </Button>
                            }
                        </Box>
                    </>
                }
            </Box>
            <WrapperInfo>
                <p>5X</p>
                <p>Acquiring a new customer is 5x more costly than making an unhappy customer happy</p>
            </WrapperInfo>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  background-color: #123b5c;

  button {
    text-transform: initial;
  }
`

const IconEmptyCircle = styled.img.attrs(({
    src: emptyCircle,
}))`
  width: 50px;
  height: 50px;
`

const IconDoneCircle = styled.img.attrs(({
    src: doneCircle,
}))`
  width: 50px;
  height: 50px;
`

const IconBlackedOutCircle = styled.img.attrs(({
    src: blackedOutCircle,
}))`
  width: 50px;
  height: 50px;
`

const RightArrowIcon = styled.img.attrs(({
    src: rightArrow,
}))`
  width: 23px;
  height: 23px;
`

const LeftArrowIcon = styled.img.attrs(({
    src: leftArrow,
}))`
  width: 23px;
  height: 23px;
`

const StyledStep = styled(Step)(() => ({
    fontWeight: 400,

    'MuiStepLabel-label.Mui-completed': {
        color: '#FFFFFF',
    },

    '.MuiStepLabel-label.Mui-active': {
        color: '#FFFFFF',
    },

    'MuiStepLabel-label': {
        color: '#5D7FA3',
    },
}));

const StepsConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#32ABF2',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#32ABF2',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#5D7FA3',
        borderTopWidth: 3,
        borderRadius: 1,
        borderWidth: 3,
        height: '80px',
        marginLeft: 10,
    },
}));

const WrapperInfo = styled('div')`
  display: flex;
  align-items: center;
  background-color: #134267;
  border-radius: 8px;
  width: 360px;
  height: 80px;
  margin-top: 45px;
  color: #96CAF7;
  padding: 10px;

  p:first-child {
    font-size: 32px;
    margin-right: 14px;
  }

  p:last-child {
    font-size: 16px;
  }
`

export default ProgressIndicator;