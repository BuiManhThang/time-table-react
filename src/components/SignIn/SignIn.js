import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router';
import { useAuth } from '../../context/AuthContext'
import Input from '../Input/Input';
import styles from './SignIn.module.css';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';

const SignIn = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [errors, setErrors] = useState('');
    const {loading, setLoading} = useLoading();
    
    const { signIn } = useAuth();
    const history = useHistory();

    useEffect(() => {
        setLoading(false);
    }, [setLoading])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrors('');
            setLoading(true);
            await signIn(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push('/');
        } catch(err) {
            if(err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                setErrors('Email or Password is wrong');
            } else {
                setErrors('Fail to sign in')
            }
            setLoading(false);
        }
    }
    

    return (
        <div className={styles.container}>
            <form action="" onSubmit={handleSubmit} className={styles.form} >
                <h1 className={styles.title}>Welcome back</h1>
                <Input text="Email" id="email" type="text" inputRef={emailRef} />
                <Input text="Password" id="password" type="password" inputRef={passwordRef} />
                <Link to='reset-password' className={styles.forgotPassword}>Forgot password?</Link>
                <div className={styles.errors}>
                    {errors && <p>{errors}</p> }
                </div>
                <div className={styles.box} >
                    <span>Sign In</span>
                    <button disabled={loading} type="submit" className={`${styles.btn} ${loading ? styles.btn_loading : ''}`} ><i className="fas fa-arrow-right"></i></button>
                </div>
                <Link to="/sign-up" className={styles.signUp}>Sign Up</Link>
            </form>
        </div>
    )
}

export default SignIn
