'use client'

import { createContext } from "react";
import { useReducer } from 'react';
import { uiReducer } from "./ui-reducer";



export const UiContext = createContext()

const UI_INITIAL_STATE = {
    loginModalOpen: false,
    sidebarOpen: false,
    artistRegisterOpen: false,
};

export const UiProvider = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const setLoginModalOpen = (value) => {
        dispatch({ type: '[UI] - set LoginModal open', payload: value });
    };

    const setSidebarOpen = (value) => {
        dispatch({ type: '[UI] - set Sidebar open', payload: value });
    };

    const setArtistRegisterOpen = (value) => {
        console.log("provider", value)
        dispatch({ type: '[UI] - set ArtistRegister open', payload: value });
    };

    // We return the state and the methods so we can use them in the components
    return (
        <UiContext.Provider value={{
            ...state,

            // methods
            setArtistRegisterOpen,
            setLoginModalOpen,
            setSidebarOpen
        }}>
            {children}
        </UiContext.Provider>
    );
};
