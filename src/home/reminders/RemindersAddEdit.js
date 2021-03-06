import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styles from './Reminders.module.scss';
import { IoClose } from 'react-icons/io5';
import { BiMessageSquareMinus } from 'react-icons/bi';


const RemindersAddEdit = ({ remindersList, keyOfEdit, deleteReminder, addReminder, callToggleForm })  => {

    const [reminderInput, setReminderInput] = useState({
        date: (new Date()).toLocaleDateString('en-CA'),
        title: '',
        location: '',
        startTime: '12:00',
        endTime: '13:00',
        key: uuidv4()
    });

    useEffect(() => {
        if(keyOfEdit) setReminderInput(() => remindersList.filter(reminder => reminder.key === keyOfEdit)[0] )
    }, [keyOfEdit, remindersList])
    
    // Determining time difference between start and end time
    const timeDifference  = (start, end) => {
        let endTime = end.split(':');
        let startTime = start.split(':');
        let hourDifference = (Number(endTime[0]) - Number(startTime[0]))*60;
        let overallMinutesDifference = hourDifference + (endTime[1] - startTime[1]);
        return overallMinutesDifference
    }

    const handleInputChange = (event) => {
        setReminderInput(prev => ( { ...prev,  [event.target.name]: event.target.value } ) ); 
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        // Alert if start time is after end time
        if(timeDifference(reminderInput.startTime, reminderInput.endTime) < 0){
            alert('Please set the finish time after the start time');
            return
        }

        if(keyOfEdit) deleteReminder(keyOfEdit);
        addReminder(reminderInput);
    };

    return (
        <div className={styles.add_task_container}>
            <form autoComplete="off" onSubmit={onFormSubmit} >
                <IoClose className={styles.add_reminder_close_form_icon} onClick={callToggleForm}/>
                <h2>
                    <BiMessageSquareMinus className={styles.add_reminder_title_icon}/>
                    Reminder
                </h2>
                <div className={styles.add_reminder_input_label_container}>
                    <label className={styles.add_reminder_label} htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" value={reminderInput.date} onChange={handleInputChange}/>
                </div>
                <div className={`${styles.add_reminder_input_label_container} ${styles.time_input_container}`}>
                    <label className={styles.add_reminder_label} htmlFor="time">Time</label>
                    <div className={`${styles.time_input_container}`} id="time">
                        <input id="starts" name="startTime" type="time" className={styles.time_input} value={reminderInput.startTime} onChange={handleInputChange}/>
                        <span className={styles.reminder_time_to}> to </span>
                        <input id="end" name="endTime" type="time" className={styles.time_input} value={reminderInput.endTime} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className={styles.add_reminder_input_label_container}>
                    <label className={styles.add_reminder_label} htmlFor="task">Task</label>
                    <input type="text" name="title" id="task" value={reminderInput.title} onChange={handleInputChange} required/>
                </div>
                <div className={styles.add_reminder_input_label_container}>
                    <label className={styles.add_reminder_label} htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" value={reminderInput.location} onChange={handleInputChange}/>         
                </div>
                
                {(keyOfEdit) ? (
                    <div className={styles.edit_delete_buttons}>
                        <button type="submit" name="editButton" >Edit Event</button>
                        <button type="button" onClick={() => deleteReminder(keyOfEdit) }>Delete</button>
                    </div>
                ):(
                    <button type="submit">Add Event</button>
                )}
            </form>
        </div>
    )
}

export default RemindersAddEdit;
