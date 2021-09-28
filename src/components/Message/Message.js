import React, { useEffect } from 'react'
import { useLoading } from '../../context/LoadingContext'
import styles from './Message.module.css'

const Message = () => {
    const {errors, color, isOpenMsg, closeMsg} = useLoading();

    useEffect(() => {
        let closeFunc;
        if(isOpenMsg) {
            closeFunc = setTimeout(() => {
                closeMsg();
            }, 3000);
        } else {
            clearTimeout(closeFunc);
        }
        return closeFunc; 
    }, [isOpenMsg, closeMsg])



    return (
        <div className={`${styles.container} ${isOpenMsg ?styles.container_active : ''}`} style={{borderColor: color}} >
            <p className={styles.text}>{errors}</p>
            <button className={styles.close} onClick={closeMsg} ><i className="fas fa-times"></i></button>
        </div>
    )
}

export default Message
