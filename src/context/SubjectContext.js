import React, { useContext, useEffect, useState } from 'react'
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, setDoc } from '@firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const SubjectContext = React.createContext({data: []});

export const useSubject = () => useContext(SubjectContext);

export const SubjectProvider = ({ children }) => {
    const [data, setData] = useState();
    const {currentUser} = useAuth();

    useEffect(() => {
        const unSubcriber = onSnapshot(query(collection(db, "data"), where("userId", "==", currentUser.uid)), (queySnapshot) => {
            const preData = [];
            queySnapshot.forEach(doc => {
                preData.push({...doc.data(), id: doc.id})
            })
            setData(preData);
        })
        return unSubcriber;
    }, [currentUser.uid])

    const addSubject = (name, time, room, color, userId) => {
        return addDoc(collection(db, "data"), {name, time, room, color, userId})
    }

    const deleteSubject = (id) => {
        return deleteDoc(doc(db, "data", id))
    }

    const updateSubject = (id, name, time, room, color, userId) => {
        return setDoc(doc(db, "data", id), {name, time, room, color, userId})
    }

    const value = {
        data,
        addSubject,
        deleteSubject,
        updateSubject
    }

    return (
        <SubjectContext.Provider value={value}>
            {children}
        </SubjectContext.Provider>
    )
}

