import React, {useRef} from 'react'
import { useHistory } from 'react-router';
import { useAuth } from '../../context/AuthContext'
import Input from '../Input/Input';
import styles from './ResetPassword.module.css';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';

const ResetPassword = () => {
    const emailRef = useRef(null);
    const {loading, setLoading, setMsg} = useLoading();
    
    const { resetPassword } = useAuth();
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setLoading(false);
            setMsg('green', 'Please check your email and follow the instructions');
            history.push('/');
        } catch(err) {
            if(err.code === 'auth/user-not-found') {
                setMsg('red' ,'Email does not exist');
            } else {
                setMsg('red', 'Fail to reset password')
            }
            setLoading(false);
        }
    }
    

    return (
        <div className={styles.container}>
            <form action="" onSubmit={handleSubmit} className={styles.form} >
                <h1 className={styles.title}>Welcome back</h1>
                <Input text="Email" id="email" type="text" inputRef={emailRef} />
                <div className={styles.box} >
                    <span>Reset Password</span>
                    <button disabled={loading} type="submit" className={`${styles.btn} ${loading ? styles.btn_loading : ''}`} ><i className="fas fa-arrow-right"></i></button>
                </div>
                <Link to="/sign-up" className={styles.signUp}>Sign Up</Link>
            </form>
        </div>
    )
}

export default ResetPassword