import React, { useContext, useState, useRef } from 'react'

const FormContext = React.createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({children}) => {
    const [isActive, setActive] = useState(false);
    const [id, setId] = useState(null);
    const nameRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);
    const roomRef = useRef(null);
    const colorRef = useRef(null);
    const dateRef = useRef(null);
    

    const open = (id=null, name, start, end, room, color, date) => {
        setId(id);
        nameRef.current.value = name;
        startRef.current.value = start;
        endRef.current.value = end;
        roomRef.current.value = room;
        colorRef.current.value = color;
        dateRef.current.value = date;
        setActive(true);
    }

    const close = () => {
        setActive(false);
    }

    const value = {
        isActive,
        open,
        close,
        nameRef,
        startRef,
        endRef,
        roomRef,
        colorRef,
        dateRef,
        id
    }
    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}
