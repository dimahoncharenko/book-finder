import React, { useReducer, useMemo, useEffect, useRef, Children } from "react";

const initialState = false;

const actions = {
    ON: "ON" as "ON",
    OFF: "OFF" as "ON",
    TOGGLE: "TOGGLE" as "TOGGLE"
};

type Action = {
    type: keyof typeof actions 
}

type Context = {
    on: boolean
    toggle: () => void
    setOn: () => void
    setOff: () => void
}

function toggleReducer(state = initialState, action: Action) {
    switch (action.type) {
        case actions.ON:
            return true;
        case actions.OFF:
            return false;
        case actions.TOGGLE:
            return !state;
        default: 
            return state;
    }
}

const useEffectAfterMount = (cb: (...args: any[]) => any, dependencies: any[]) => {
    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current && cb) {
            return cb();
        }

        mounted.current = true;
    }, dependencies);
}

const useToggle = (reducer = toggleReducer) => {
    const [ on, dispatch ] = useReducer(toggleReducer, initialState);

    const setOn = dispatch.bind(null, { type: actions.ON });
    const setOff = dispatch.bind(null, { type: actions.OFF });
    const toggle = dispatch.bind(null, { type: actions.TOGGLE });

    return { on, setOn, setOff, toggle };
};  

type Props = {
    children: React.ReactNode
    onToggle?: () => void 
}

const ToggleContext = React.createContext<Context>({ on: false, setOn: () => {}, setOff: () => {}, toggle: () => {} });

const useToggleContext = () => {
    const context = React.useContext(ToggleContext);
    if (!context) {
        throw new Error("The compounds components required to be inside of Toggle component!");
    }
    return context;
}

const BasicToggle = ({ onToggle, children }: Props) => {
    const { on, setOn, setOff, toggle } = useToggle();
 
    useEffectAfterMount(onToggle!, [on]);

    const value = useMemo(() => ({ on, setOn, setOff, toggle }), [on]);

    return (
        <ToggleContext.Provider value={value}>
            {children}
        </ToggleContext.Provider>
    );
};

const On = ({ children }: { children: React.ReactElement }) => {
    const { on } = useToggleContext();
    return on ? children : null;
};

const Off = ({ children }: { children: React.ReactElement }) => {
    const { on } = useToggleContext();
    return on ? null : children;
};

const ToggleButton = ({ children }: { children: React.ReactElement }) => {
    const { toggle } = useToggleContext();

    return <button onClick={toggle}>{children}</button>
};  

BasicToggle.On = On;
BasicToggle.Off = Off;
BasicToggle.Button = ToggleButton;

export default BasicToggle;