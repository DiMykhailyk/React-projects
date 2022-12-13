import React, {useContext, useState} from "react";


interface StepState {
    steps: Record<number, string>,
    currentStep: number,
    stepDecrement: () => void,
    stepIncrement: () => void,
}

type StepsProviderProps = { children: React.ReactNode }

const StepsContext = React.createContext<StepState | undefined>(undefined)

const useSteps = () => {
    const context = useContext(StepsContext)

    if (!context) {
        throw new Error('useSteps must be used within a stepsContextProvider')
    } else {
        return context
    }
}

const StepsProvider = (({children}: StepsProviderProps): JSX.Element => {
    const initialState: StepState = {
        steps: {
            0: 'Welcome',
            1: 'Connect your Spotify store',
            2: 'Connect your customer support email',
            3: 'Done',
        },
        currentStep: 0,
        stepDecrement,
        stepIncrement,
    }
    const [fullState, setFullState] = useState(initialState)
    function stepIncrement() {
        const stateCopy = {...fullState}
        stateCopy.currentStep = stateCopy.currentStep + 1
        setFullState(stateCopy)
    }
    function stepDecrement() {
        const stateCopy = {...fullState}
        stateCopy.currentStep = stateCopy.currentStep - 1
        setFullState(stateCopy)
    }
    const value = {
        steps: fullState.steps,
        currentStep: fullState.currentStep,
        stepDecrement,
        stepIncrement,
    }
    return <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
});

export {StepsProvider, useSteps};