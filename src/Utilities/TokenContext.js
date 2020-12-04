import React, { useState, useEffect, useContext, createContext} from 'react';
import {useHistory} from 'react-router-dom';

const TokenContext = createContext({});


export const TokenProvider = (props) => {
    const helperContext = TokenHelper()
    return (
        <TokenContext.Provider value={helperContext}>
            {props.children}
        </TokenContext.Provider>
    )
}

export default TokenContext;
export const useToken = () => useContext(TokenContext);

function TokenHelper() {
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState(-1);

    function saveToken(newToken){
        setToken(newToken);
        window.sessionStorage.setItem('token', newToken);
    }

    function saveUser(newUserId){
        setUserId(newUserId);
    }

    function logOut(){
        setToken("");
        window.sessionStorage.removeItem('token');
    }

    useEffect(()=> {
        const ssToken = window.sessionStorage.getItem('token');

        if (ssToken){
            setToken(ssToken);
        }
    }, [])

    return {
        token,
        saveToken,
        logOut,
        userId,
        saveUser
    }
}