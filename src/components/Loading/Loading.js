import React from 'react'
import styles from './Loading.module.css'
import { useLoading } from '../../context/LoadingContext'

const Loading = () => {
    const {loading} = useLoading();

    return (
        <div className={`${styles.container} ${loading ? styles.container_active : ''}`}>
            <div className={styles.load}></div>
        </div>
    )
}

export default Loading
