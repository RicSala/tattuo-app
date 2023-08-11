'use client'

import { createContext, useRef } from "react";
import { useEffect, useReducer } from 'react';

import { signOut, useSession } from 'next-auth/react';
import { authReducer } from "./auth-reducer";
import axios from "axios";





export const AuthContext = createContext()


const AUTH_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined, // When we load the app, we don't know the user
};

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const { data, status } = useSession()
    // use a ref to keep track of how many times the component has been rendered
    const renders = useRef(0);

    console.log("AUTHPROVIDER - renders: ", renders.current++)

    useEffect(() => {

        if (status === 'authenticated') {

            try {
                const getBoardsFromDb = async () => {
                    const res = await axios.get('/api/boards')
                    const user = { ...data?.user, boards: res?.data }
                    dispatch({ type: '[AUTH] - Login', payload: user });
                }
                getBoardsFromDb()
            } catch (error) {
                console.log("ERROR - AuthProvider", error)
            }
        }
    }, [status, data])

    const addBoardToUser = (board) => {
        dispatch({ type: '[AUTH] - Add Board', payload: board });
    }

    const removeBoardFromUser = (boardId) => {
        dispatch({ type: '[AUTH] - Remove Board', payload: boardId });
    }



    // We return the state and the methods so we can use them in the components
    return (
        <AuthContext.Provider value={{
            ...state,

            // methods
            // registerUser, // REVIEW: Prefer to do it from the modal
            addBoardToUser,
            removeBoardFromUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
