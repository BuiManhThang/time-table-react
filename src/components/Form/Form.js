import React, { useRef } from 'react'
import styles from './Form.module.css'
import Input from '../Input/Input'
import { useForm } from '../../context/FormContext'
import { useSubject } from '../../context/SubjectContext'
import { useAuth } from '../../context/AuthContext'
import { useLoading } from '../../context/LoadingContext'


const OPTIONS = [
    {
        value: 0,
        text: 'Monday'
    },
    {
        value: 1,
        text: 'Tuesday'
    },
    {
        value: 2,
        text: 'Wednesday'
    },
    {
        value: 3,
        text: 'Thursday'
    },
    {
        value: 4,
        text: 'Friday'
    },
    {
        value: 5,
        text: 'Saturday'
    },
    {
        value: 6,
        text: 'Sunday'
    },
]


const Form = () => {
    const outlineRef = useRef(null);

    const {loading, setLoading, setMsg} = useLoading();

    const {isActive, close, nameRef, startRef, endRef, roomRef, colorRef, dateRef, id} = useForm();
    const {addSubject, updateSubject} = useSubject();
    const {currentUser} = useAuth();

    const handleClickOutline = (e) => {
        if(e.target === outlineRef.current) {
            close();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(id) {
            try {
                await updateSubject(
                    id,
                    nameRef.current.value,
                    {
                        start: startRef.current.value,
                        end: endRef.current.value,
                        date: dateRef.current.value,
                    },
                    roomRef.current.value,
                    colorRef.current.value,
                    currentUser.uid
                )
                setLoading(false);
                setMsg("green", "Success");
                close();
            } catch {
                setMsg("red", "Faild to update subject");
                setLoading(false);
            }
        } else {
            try {
                await addSubject(nameRef.current.value,
                                {
                                    start: startRef.current.value,
                                    end: endRef.current.value,
                                    date: dateRef.current.value,
                                },
                                roomRef.current.value,
                                colorRef.current.value,
                                currentUser.uid
                    )
                setLoading(false);
                setMsg("green", "Success");
                close();
            } catch {
                setMsg("red", "Faild to add subject");
                setLoading(false);
            }
        }
    }

    return (
        <div className={`${styles.container} ${isActive ? styles.container_active : ''}`} onClick={handleClickOutline} ref={outlineRef} >
            <div className={styles.wapper}>
                <button onClick={close} className={styles.close}><i className="fas fa-times"></i></button>
                <h1 className={styles.title}>{id ? 'Update Subject' : 'Add Subject'}</h1>
                <form action="" className={styles.form} onSubmit={handleSubmit}>
                    <Input type="text" id="name" text="Name" inputRef={nameRef} />
                    <div className={styles.timeControl}>
                        <Input type="time" id="start" text="Time Start" inputRef={startRef} />
                        <Input type="time" id="end" text="Time End" inputRef={endRef} />
                    </div>
                    <Input type="text" id="room" text="Room" inputRef={roomRef} />
                    <Input type="select" id="date" text="Date" inputRef={dateRef} options={OPTIONS} />
                    <Input type="color" id="color" text="Color" inputRef={colorRef} />
                    <button disabled={loading} className={styles.btn} type="submit">{id ? 'Update' : 'Add'}</button>
                </form>
            </div>
        </div>
    )
}

export default Form
