import React, { useState } from 'react'
import styles from './Subject.module.css'
import Edit from '../Edit/Edit'

const Subject = ({name, time, room, color, id}) => {
    const [isActive, setActive] = useState(false);


    return (
        <div className={styles.container} style={{borderLeftColor: color}}>
            <div className={styles.header}>
                <h2 className={styles.name} style={{color: color}}>{name}</h2>
                <button onClick={() => setActive(true)} className={styles.editBtn}><i className="fas fa-ellipsis-v"></i></button>
                <Edit isActive={isActive} setActive={setActive} id={id} name={name} time={time} room={room} color={color} />
            </div>
            <div className={styles.body}>
                <p className={styles.time}>{time.start.h}:{time.start.m} - {time.end.h}:{time.end.m}</p>
                <p className={styles.room}>{room}</p>
            </div>
        </div>
    )
}

export default Subject
