import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@firebase/auth'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext);
} 

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubcriber = () => { 
            onAuthStateChanged(auth, (user) => {
                setCurrentUser(user);
                setLoading(false);
            })
        }
        unsubcriber();
        return () => {
            unsubcriber();
        };
    }, [])

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        return signOut(auth);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const value = {
        currentUser,
        signUp,
        signIn,
        signOutUser,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

