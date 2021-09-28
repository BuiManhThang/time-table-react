import React, { useEffect, useRef } from 'react'
import { useForm } from '../../context/FormContext';
import { useLoading } from '../../context/LoadingContext';
import { useSubject } from '../../context/SubjectContext';
import styles from './Edit.module.css'

const Edit = ({isActive, setActive, id, name, color, room, time}) => {
    const listRef = useRef(null);
    const {setLoading, setMsg} = useLoading()
    const {deleteSubject} = useSubject();
    const {open} = useForm();

    useEffect(() => {
        const closeEdit = (e) => {
            if(isActive && !listRef.current.contains(e.target)) {
                setActive(false);
            }
        }

        window.addEventListener('click', closeEdit);
        
        return () => {
            window.removeEventListener('click', closeEdit);
        }
    }, [setActive, isActive])

    const handleDelete = async () => {
        setLoading(true);
        setActive(false);
        try {
            await deleteSubject(id);
            setLoading(false);
            setMsg("green" ,'Success');
        } catch {
            setMsg("red" ,'faild to delete subject');
            setLoading(false);
        }
    }

    const handleOpenForm = () => {
        open(id, name, `${time.start.h}:${time.start.m}`, `${time.end.h}:${time.end.m}`, room, color, time.date);
    }

    return (
        <ul ref={listRef} className={`${styles.list} ${isActive ? styles.list_active : ''}`}>
            <li className={styles.item}>
                <button className={styles.btn} onClick={handleOpenForm} ><i className="fas fa-edit"></i></button>
            </li>
            <li className={styles.item}>
                <button className={styles.btn} onClick={handleDelete} ><i className="fas fa-trash-alt"></i></button>
            </li>
        </ul>
    )
}

export default Edit
