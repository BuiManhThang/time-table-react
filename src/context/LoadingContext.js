import React, { useContext, useState } from 'react'

const LoadingContext = React.createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [color, setColor] = useState('');
    const [isOpenMsg, setOpenMsg] = useState(false);

    const setMsg = (color, text) => {
        setErrors(text);
        setColor(color);
        setOpenMsg(true);
    }

    const closeMsg = () => {
        setOpenMsg(false);
    }

    const value = {
        loading,
        setLoading,
        setMsg,
        errors,
        color,
        isOpenMsg,
        closeMsg
    }

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}
