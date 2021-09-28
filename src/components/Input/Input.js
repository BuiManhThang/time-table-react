import React from 'react'
import styles from './Input.module.css'

const Input = ({ id, text, type, inputRef, options=[] }) => {
    return (
        <div className={styles.formControl}>
            {type !== 'select' 
                ? <input ref={inputRef} type={type} id={id} autoComplete="off" required className={`${styles.input} ${type === 'color' ? styles.input_color : ''}`} />
                : <select name={id} id={id} className={styles.input} ref={inputRef} required >
                    {options.map(option => <option key={option.value} value={option.value}>{option.text}</option> )}
                </select>
            }
            <label htmlFor={id} className={styles.label} >{text}</label>
            <div className={styles.line}></div>
        </div>
    )
}

export default Input

