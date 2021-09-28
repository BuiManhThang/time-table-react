import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import styles from './TimeTable.module.css';
import Subject from '../Subject/Subject';
import Form from '../Form/Form';
import { useForm } from '../../context/FormContext';
import { useSubject } from '../../context/SubjectContext';
import { useLoading } from '../../context/LoadingContext';


const dataFormat = (data) => {
    const fomattedData = {
        morning: [[], [], [], [], [], [], []],
        afternoon: [[], [], [], [], [], [], []],
        night: [[], [], [], [], [], [], []]
    }
    data.forEach(theSubject => {
        const subject = {
            color: theSubject.color,
            id: theSubject.id,
            name: theSubject.name,
            room: theSubject.room,
            time: {
                date: Number(theSubject.time.date),
                start: theSubject.time.start,
                end: theSubject.time.end
            }
        }
        const index = subject.time.date;
        const timeStart = subject.time.start.split(':');
        const timeEnd = subject.time.end.split(':');
        subject.time.start = {
            h: timeStart[0],
            m: timeStart[1]
        }
        subject.time.end = {
            h: timeEnd[0],
            m: timeEnd[1]
        }
        const timeStartH = Number(subject.time.start.h);
        const timeStartM = Number(subject.time.start.m);
        if(timeStartH < 12) {
            fomattedData.morning[index].push(subject);
        } else if((timeStartH === 17 && timeStartM >= 30) || timeStartH > 17) {
            fomattedData.night[index].push(subject);
        } else {
            fomattedData.afternoon[index].push(subject);
        }
    })
    fomattedData.morning.forEach((date) => {
        date.sort((subjectA, subjectB) => (Number(subjectA.time.start.h) * 60 + Number(subjectA.time.start.m)) > (Number(subjectB.time.start.h) * 60 + Number(subjectB.time.start.m)) ? 1 : (Number(subjectA.time.start.h) * 60 + Number(subjectA.time.start.m)) < (Number(subjectB.time.start.h) * 60 + Number(subjectB.time.start.m)) ? -1 : 0)
    })
    fomattedData.afternoon.forEach((date) => {
        date.sort((subjectA, subjectB) => (Number(subjectA.time.start.h) * 60 + Number(subjectA.time.start.m)) > (Number(subjectB.time.start.h) * 60 + Number(subjectB.time.start.m)) ? 1 : (Number(subjectA.time.start.h) * 60 + Number(subjectA.time.start.m)) < (Number(subjectB.time.start.h) * 60 + Number(subjectB.time.start.m)) ? -1 : 0)
    })
    fomattedData.night.forEach((date) => {
        date.sort((subjectA, subjectB) => (Number(subjectA.time.start.h) * 60 + Number(subjectA.time.start.m)) > (Number(subjectB.time.start.h) * 60 + Number(subjectB.time.start.m)) ? 1 : (Number(subjectA.time.start.h) * 60 + Number(subjectA.time.start.m)) < (Number(subjectB.time.start.h) * 60 + Number(subjectB.time.start.m)) ? -1 : 0)
    })
    return fomattedData;
}

const TimeTable = () => {
    const {currentUser, signOutUser} = useAuth();
    const [errors, setErrors] = useState('');
    // const history = useHistory();
    const {open} = useForm();
    const {data} = useSubject();
    const [subjectList, setSubjectList] = useState(dataFormat([]));

    const {loading, setLoading} = useLoading();
    
    useEffect(() => {
        if(data) {
            // setSubjectList(data ? dataFormat(data) : dataFormat([]));
            setLoading(false);
            setSubjectList(dataFormat(data));
        } else {
            setLoading(true);
        }
    }, [data, setLoading])

    const handleSignOut = async () => {
        setLoading(true);
        try {
            setErrors('')
            await signOutUser();
        } catch {
            setErrors('Faild to sign out');
            setLoading(false);
        }
    }

    const handleOpenForm = () => {
        open(null, '', '00:00', '00:00', '', '#000', 0);
    }

    return (
        <div className={styles.container}>
            {errors && <p>{errors}</p> }
            <Form/>
            <div className={styles.wapper}>
                {errors && <div>{errors}</div>}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.title}>Time Table</h1>
                        <button onClick={handleOpenForm} className={`${styles.headerBtn} ${styles.addBtn}`} ><i className="fas fa-plus"></i></button>
                    </div>
                    <div className={styles.user}>
                        <p>{currentUser.email}</p>
                        <button disabled={loading} className={styles.headerBtn} onClick={handleSignOut} ><i className="fas fa-sign-out-alt"></i></button>
                    </div>
                </div>
                <div className={styles.tableWapper}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <th className={styles.th}><p>&nbsp;</p></th>
                                <th className={styles.th}><p>Monday</p></th>
                                <th className={styles.th}><p>Tuesday</p></th>
                                <th className={styles.th}><p>Wednesday</p></th>
                                <th className={styles.th}><p>Thursday</p></th>
                                <th className={styles.th}><p>Friday</p></th>
                                <th className={styles.th}><p>Saturday</p></th>
                                <th className={styles.th}><p>Sunday</p></th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            <tr className={styles.tr}>
                                <td className={styles.td}>
                                    <p className={styles.time}>Morning</p>
                                </td>
                                {subjectList.morning.map((subjects, index) => {
                                    if(subjects.length > 0) {
                                        return (
                                            <td key={index} className={styles.td}>
                                                <div className={styles.box}>
                                                    {subjects.map((subject, idx) => {
                                                        return <Subject key={idx} name={subject.name} time={subject.time} room={subject.room} color={subject.color} id={subject.id} />
                                                    })}
                                                </div>
                                            </td>
                                        )
                                    }
                                    return (
                                        <td key={index} className={styles.td}>
                                            <div className={styles.box} ></div>
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>
                                    <p className={styles.time}>Afternoon</p>
                                </td>
                                {subjectList.afternoon.map((subjects, index) => {
                                    if(subjects.length > 0) {
                                        return (
                                            <td key={index} className={styles.td}>
                                                <div className={styles.box}>
                                                    {subjects.map((subject, idx) => {
                                                        return <Subject key={idx} name={subject.name} time={subject.time} room={subject.room} color={subject.color} id={subject.id} />
                                                    })}
                                                </div>
                                            </td>
                                        )
                                    }
                                    return (
                                        <td key={index} className={styles.td}>
                                            <div className={styles.box} ></div>
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>
                                    <p className={styles.time}>Night</p>
                                </td>
                                {subjectList.night.map((subjects, index) => {
                                    if(subjects.length > 0) {
                                        return (
                                            <td key={index} className={styles.td}>
                                                <div className={styles.box}>
                                                    {subjects.map((subject, idx) => {
                                                        return <Subject key={idx} name={subject.name} time={subject.time} room={subject.room} color={subject.color} id={subject.id} />
                                                    })}
                                                </div>
                                            </td>
                                        )
                                    }
                                    return (
                                        <td key={index} className={styles.td}>
                                            <div className={styles.box} ></div>
                                        </td>
                                    )
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TimeTable
