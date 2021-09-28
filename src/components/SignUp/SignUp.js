import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import styles from './SignUp.module.css';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';

const SignUp = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [errors, setErrors] = useState('');
    const {loading, setLoading} = useLoading();

    const {signUp} = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(passwordRef.current.value !== confirmRef.current.value) {
            setErrors('Password is not match');
            return;
        }
        try {
            setErrors('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push('/');
        } catch(err) {
            if(err.code === 'auth/email-already-in-use') {
                setErrors('Email exists');
            } else {
                setErrors('Fail to create an account')
            }
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <form action="" onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>Get Started</h1>
                <Input text="Email" id="email" type="text" inputRef={emailRef} />
                <Input text="Password" id="password" type="password" inputRef={passwordRef} />
                <Input text="Confirm Password" id="confirm-password" type="password" inputRef={confirmRef} />
                <div className={styles.errors}>
                    {errors && <p>{errors}</p> }
                </div>
                <div className={styles.box} >
                    <span>Sign Up</span>
                    <button disabled={loading} type="submit" className={`${styles.btn} ${loading ? styles.btn_loading : ''}`} ><i className="fas fa-arrow-right"></i></button>
                </div>
                <Link to="/sign-in" className={styles.signIn}>Sign In</Link>
            </form>
        </div>
    )
}

export default SignUp
