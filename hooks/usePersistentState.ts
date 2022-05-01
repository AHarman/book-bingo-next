import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function usePersistentState<S>(stateName: string, initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
    const [state, setNonPersistentState] = useState(initialState);

    useEffect(() => {
        const storedStateString = localStorage.getItem(stateName);
        const storedState = storedStateString ? JSON.parse(storedStateString) as S : undefined;
        if (storedState)
            setNonPersistentState(storedState);
    }, [stateName]);

    function setPersistentState(action: SetStateAction<S>): void {
        const newState = applyAction(action, state);
        localStorage.setItem(stateName, JSON.stringify(newState));
        setNonPersistentState(newState);
    }

    return [state, setPersistentState];
}

export const applyAction = <S>(action: SetStateAction<S>, prevState: S): S =>
    typeof(action) === "function" ?
        (action as (prevState: S) => S)(prevState) :
        action;